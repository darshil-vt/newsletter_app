import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './organization-dto/organization-dto';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>
    ) {}

        async create(createOrganizationDto:CreateOrganizationDto): Promise<Organization> {
            const user = this.organizationRepository.create(createOrganizationDto);
            return this.organizationRepository.save(user);
        }

        async findAll(): Promise<Organization[]> {
            return this.organizationRepository.find();
        }ß

        async findOne(id:string): Promise<Organization> {
            return this.organizationRepository.findOne({ where: { id }})
        }
}
