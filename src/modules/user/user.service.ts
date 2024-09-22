import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user-dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}


        async create(createUserDto: CreateUserDto): Promise<User> {
            const salt = await bcrypt.genSalt();
            createUserDto.password_hash = await bcrypt.hash(createUserDto.password_hash, salt);
            const user = this.userRepository.create( createUserDto );
            return this.userRepository.save(user);
        }

        async findOne(id:string): Promise<User> {
            return this.userRepository.findOne({ where: { id }})
        }

        async findOneByEmail(email: string): Promise<User> {
            return this.userRepository.findOne({ where: { email } });
          }
}
