import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto, UpdateSubscriberDto } from './subscriber-dto/subscriber.dto';
import { Subscriber } from './subscriber.entity';
import { FilterQueryDto } from './subscriber-dto/filter-query.dto';
import { PaginationQueryDto } from 'src/helper/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('subscribers')
export class SubscribersController {
    constructor(
        private readonly subscribersService: SubscribersService
    ) {}

    @Get()
    findAll(
      @Query() paginationQuery: PaginationQueryDto,
      @Query() filterQuery: FilterQueryDto,
    ): Promise<Subscriber[]> {
        return this.subscribersService.findAll(paginationQuery, filterQuery);
    }

    @Post()
    create(@Body() createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {  
        return this.subscribersService.create(createSubscriberDto);
    }

    @Post('upload-csv')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.subscribersService.processCsv(file);
    }

    @Put(':id')
    async update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    return this.subscribersService.update(id, updateSubscriberDto);
  }

}
