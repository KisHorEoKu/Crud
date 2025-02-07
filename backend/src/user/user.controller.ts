import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user';
import { user } from 'src/entity/user';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService ){}

    @Post()
    async create(@Body()  createUserDto:CreateUserDto):Promise<user>{
        return await this.userService.create(createUserDto);
    }
}
