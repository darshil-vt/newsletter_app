import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './subscriber.entity';
import { Repository } from 'typeorm';
import { CreateSubscriberDto, UpdateSubscriberDto } from './subscriber-dto/subscriber.dto';
import { PaginationQueryDto } from 'src/helper/pagination.dto';
import { FilterQueryDto } from './subscriber-dto/filter-query.dto';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';

@Injectable()
export class SubscribersService {
    constructor(
        @InjectRepository(Subscriber)
        private subscriberRepository: Repository<Subscriber>
    ) { }

    async findAll(
        paginationQuery: PaginationQueryDto,
        filterQuery: FilterQueryDto,
    ): Promise<Subscriber[]> {
        const { page = 1, limit = 10 } = paginationQuery;
        const { email } = filterQuery;

        const where = {};
        if (email) {
            where['email'] = email;
        }
        return this.subscriberRepository.find(
            {
                where,
                take: limit,
                skip: limit * (page - 1),
            }
        );
    }

    async findSubscriber(user: any): Promise<Subscriber[]> {
        return this.subscriberRepository.find({ where: { organization_id: user.organization_id } });
    }

    async create(subscriberDTO: CreateSubscriberDto): Promise<Subscriber> {
        const newSubscriber = this.subscriberRepository.create(subscriberDTO);
        return this.subscriberRepository.save(newSubscriber);
    }

    async update(id: string, updateSubscriberDto: UpdateSubscriberDto): Promise<Subscriber> {
        const subscriber = await this.subscriberRepository.findOne({ where: { id: id } });

        if (!subscriber) {
            throw new NotFoundException(`Subscriber with ID "${id}" not found`);
        }

        Object.assign(subscriber, updateSubscriberDto);

        return this.subscriberRepository.save(subscriber);
    }

    async processCsv(file: Express.Multer.File): Promise<any> {
        const results = [];
        const stream = fs.createReadStream(file.path);
    
        return new Promise((resolve, reject) => {
          stream
            .pipe(fastcsv.parse({ headers: true }))
            .on('data', async (row) => {
              results.push(row);
              await this.saveData(row);
            })
            .on('end', () => {
              resolve({ message: 'File processed successfully', results });
            })
            .on('error', (error) => reject(error));
        });
      }
    
      async saveData(row: any) {
        const user = this.subscriberRepository.create(row);
        await this.subscriberRepository.save(user);
      }
}
