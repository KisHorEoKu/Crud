import { Injectable } from '@nestjs/common';
import { user } from '../entity/user'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/user';

@Injectable()
export class UserService {

    constructor(@InjectRepository(user) private userRepository:Repository<user>){}

    async create(createUserDto : CreateUserDto):Promise<user>{

        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);

    }

}
