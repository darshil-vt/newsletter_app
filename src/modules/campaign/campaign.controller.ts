import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Campaign } from './campaign.entity';
import { CampaignService } from './campaign.service';
import { createCampaignDTO } from './campaign-dto/campaign.dto';
import { Request } from 'express';
import { SubscribersService } from '../subscribers/subscribers.service';
import { EmailService } from '../email/email.service';

@Controller('campaign')
export class CampaignController {

    constructor(
        private readonly campaignService: CampaignService,
        private readonly subscriberService: SubscribersService,
        private readonly emailService: EmailService
    ) { }

    @Get()
    findAll(@Req() req: Request): Promise<Campaign[]> {
        const user: any = req['user'];
        return this.campaignService.findAll(user);
    }

    @Post()
    create(@Body() createCampaignDTO: createCampaignDTO): Promise<Campaign> {
        return this.campaignService.create(createCampaignDTO);
    }

    @Post(':id/send')
    async sendCampaign(@Req() req: Request, @Param('id') id: string,): Promise<any> {
        const user: any = req['user'];

        const findSubscriber = await this.subscriberService.findSubscriber(user);
        if (!findSubscriber) {
            throw new Error('No subscriber found');
        }

        const findCampaign = await this.campaignService.findCampaign(id);
        if (!findCampaign) {
            throw new Error('No campaign found');
        }

        for (let i = 0; i < findSubscriber.length; i++) {
            return this.emailService.sendEmail(findSubscriber[i].email, findCampaign.subject, findCampaign.content);
        }
    }
}
