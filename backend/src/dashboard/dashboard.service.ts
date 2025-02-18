import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { form } from 'src/entity/form';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {

    constructor(@InjectRepository(form) private formRepository:Repository<form>){}

    async update(id: number,email:string,full_name:string,user_name:string,phone:string ):Promise<any>{
        const form = await this.formRepository.findOne({where:{id}});
        console.log(form)

    if (!form){throw new Error('Form not found'); return false;}
    form.email = email;
    form.full_name = full_name;
    form.user_name = user_name;
    form.phone = phone;

    await this.formRepository.save(form);

    return true; 

  }
}
