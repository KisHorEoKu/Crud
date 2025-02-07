import { Body, Controller, Post } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from 'src/dto/form';
import { form } from 'src/entity/form';

@Controller('form')
export class FormController {
    constructor(private readonly formService:FormService){}

    @Post()
    async create(@Body() formDTO :CreateFormDTO):Promise<form>{
        return await this.formService.create(formDTO)
    }
}
