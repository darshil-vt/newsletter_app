import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ListsService } from './lists.service';
import { List } from './list.entity';
import { createListDTO, updateListDTO } from './list-dto/lists.dto';
import { Request } from 'express';

@Controller('lists')
export class ListsController {

  constructor(
    private readonly listsService: ListsService
  ) { }

  @Get()
  findAll(@Req() req: Request): Promise<List[]> {
    const user = req['user'];
    return this.listsService.findAll(user);
  }

  @Post()
  create(@Body() createSubscriberDto: createListDTO): Promise<List> {
    return this.listsService.create(createSubscriberDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: updateListDTO,
  ) {
    return this.listsService.update(id, updateSubscriberDto);
  }


}
