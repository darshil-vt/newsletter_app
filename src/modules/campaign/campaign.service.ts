import { Inject, Injectable } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createCampaignDTO } from './campaign-dto/campaign.dto';

@Injectable()
export class CampaignService {
    constructor(
        @InjectRepository(Campaign)
        private campaignRepository: Repository<Campaign>
    ) {}

    async findAll(user:any): Promise<Campaign[]> {
        return this.campaignRepository.find({ where: { organization_id: user.organization_id } });
    }

    async findCampaign(id: any): Promise<Campaign> {
        return this.campaignRepository.findOne({ where: { id: id } });
    }

    async create(campaignDTO: createCampaignDTO ): Promise<Campaign> {
        const list = this.campaignRepository.create(campaignDTO);
        return this.campaignRepository.save(list);
    }
}
