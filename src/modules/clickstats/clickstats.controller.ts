import { Body, Controller, Param, Post, Query, Res } from '@nestjs/common';
import { List } from '../lists/list.entity';
import { ClickstatsService } from './clickstats.service';
import { ClickState } from './clickstats.entity';
import { Response } from 'express';

@Controller('clickstats')
export class ClickstatsController {

  constructor(
    private readonly clickstatsService: ClickstatsService
  ) { }

  @Post()
  async create(@Query('link') link: string, @Query('campaign_id') campaign_id: string, @Res() res: Response): Promise<void> {
    try {
      await this.clickstatsService.create(link, campaign_id);
      res.redirect(link);
    } catch (e) {
      console.log('error: ', e);
    }
  }
}
