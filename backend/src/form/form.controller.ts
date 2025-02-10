import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from 'src/dto/form';
import { form } from 'src/entity/form';
import { get } from 'http';
import { commonController } from 'src/controllers/commonController';

@Controller('form')
export class FormController {
    constructor(private readonly formService:FormService){}

    common = new commonController();

    @Post()
    async create(@Body() formDTO: CreateFormDTO): Promise<form> {
      const hashedPassword = await this.common.hashPassword(formDTO.password);
      
      formDTO.password = hashedPassword;
      
      console.log(hashedPassword);
    
      return await this.formService.create(formDTO);
    }
    

    @Get('Getusers')
    async findAll():Promise<form[]>{
        return await this.formService.findAll();
    }

    @Get('getuser/:id')
    async findUser(@Param() id:number) {
        console.log(id);
        return await this.formService.findUser(id);
    }

    @Delete('delete')
    async delete(@Body() body: { id: number }): Promise<void> {
        return await this.formService.delete(body.id);
    }

    @Post('auth')
    async auth(@Body() body: { email: string, password: string }): Promise<{ success: boolean }> {
        return await this.formService.auth(body.email, body.password);
    }

}