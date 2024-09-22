import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './user-dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginDto } from './user-dto/login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly authService: AuthService
    ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('loginDto: ', loginDto);
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }


  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

}
