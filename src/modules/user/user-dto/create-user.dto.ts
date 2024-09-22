import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../user.entity';


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password_hash: string;

  @IsString()
  organization_id: string;

  @IsEnum(UserRole)
  role: UserRole;
}