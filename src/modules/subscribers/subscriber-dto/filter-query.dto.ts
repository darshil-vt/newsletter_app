import { IsOptional, IsString } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  @IsString()
  email?: string;
}
