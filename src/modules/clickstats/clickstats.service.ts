import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClickState } from './clickstats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClickstatsService {
    constructor(
        @InjectRepository(ClickState)
        private clickStateRepository: Repository<ClickState>
    ) { }

    create(link: string, campaign_id: string): Promise<ClickState> {
        const getClickCount = this.clickStateRepository.find({ where: { link: link, campaign_id: campaign_id } });
        if (getClickCount) {
            const clickCount = getClickCount[0].click_count;
            getClickCount[0].click_count = clickCount + 1;
            return this.clickStateRepository.save(getClickCount[0]);
        } else {
            const newClickState = this.clickStateRepository.create({ link: link, campaign_id: campaign_id, click_count: 1 });
            return this.clickStateRepository.save(newClickState);
        }
    }
}
