import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { form } from 'src/entity/form';
import { CreateFormDTO } from 'src/dto/form';
import { Repository } from 'typeorm';
import { commonController } from 'src/controllers/commonController';

@Injectable()
export class FormService {
    constructor(@InjectRepository(form)  private formRepository:Repository<form> ){}
    common = new commonController();

    async create(formDTO:CreateFormDTO):Promise<form>{
        const formObj = this.formRepository.create(formDTO);
        return await  this.formRepository.save(formObj);

    }
    async findAll():Promise<form[]>{
        return await this.formRepository.find();
    }

    async delete(id:number):Promise<void>{
        console.log(id);
        await this.formRepository.delete(id);
    }
    async findUser(id:number){
        return await this.formRepository.findOne({where:{id}});
    }
    async auth(email:string,password:string):Promise<{success:boolean}>{

        const hashedPassword = await this.common.hashPassword(password);

        const user = await this.formRepository.findOne({where:{email,password:hashedPassword}});
        
        if(!user){
            return {success:false};
        }
        return {success:true};
    }

}
