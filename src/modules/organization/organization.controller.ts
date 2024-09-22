import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './organization-dto/organization-dto';
import { Organization } from './organization.entity';
import { Request } from 'express';

@Controller('organization')
export class OrganizationController {

  constructor(private readonly organizationService: OrganizationService) { }

  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  findAll(@Req() req: Request): Promise<Organization[]> {
    const user: any = req['user'];
    if (user.role !== 'Superadmin') {
      throw new Error('You are not authorized to access this resource');
    }
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }
}
