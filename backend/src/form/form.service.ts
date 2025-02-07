import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { form } from 'src/entity/form';
import { CreateFormDTO } from 'src/dto/form';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {
    constructor(@InjectRepository(form)  private formRepository:Repository<form> ){}

    async create(formDTO:CreateFormDTO):Promise<form>{
        const formObj = this.formRepository.create(formDTO);
        return await  this.formRepository.save(formObj);

    }
}
