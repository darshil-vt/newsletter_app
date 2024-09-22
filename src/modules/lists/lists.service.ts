import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity';
import { Repository } from 'typeorm';
import { createListDTO, updateListDTO } from './list-dto/lists.dto';

@Injectable()
export class ListsService {

    constructor(
        @InjectRepository(List)
        private listRepository: Repository<List>
    ) { }

    async findAll(user: any): Promise<List[]> {
        return this.listRepository.find({ where: { organization_id: user.organization_id } });
    }

    async create(subscriberDTO: createListDTO): Promise<List> {
        const list = this.listRepository.create(subscriberDTO);
        return this.listRepository.save(list);
    }

    async update(id: string, updateSubscriberDto: updateListDTO): Promise<List> {
        const subscriber = await this.listRepository.findOne({ where: { id: id } });

        if (!subscriber) {
            throw new NotFoundException(`List with ID "${id}" not found`);
        }

        Object.assign(subscriber, updateSubscriberDto);

        return this.listRepository.save(subscriber);
    }


}
