import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { form } from 'src/entity/form';
import { CreateFormDTO } from 'src/dto/form';
import { Repository } from 'typeorm';
import { commonController } from 'src/controllers/commonController';
import { IUser } from './form.interface';
import { v4 as uuidv4 } from 'uuid'; 
import { Session } from '../entity/session';
import { Response } from 'express';

@Injectable()
export class FormService {
    constructor(@InjectRepository(form)  private formRepository:Repository<form>,
                @InjectRepository(Session)  private SessionRepository:Repository<Session> ){}
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
   

    async auth(email: string, password: string, @Req() res: Response): Promise<any> {
        const hashedPassword = await this.common.hashPassword(password);
        const user = await this.formRepository.findOne({ where: { email, password: hashedPassword } });
        
        if (!user) {
            return null;
        }

        const sessionID = uuidv4();
        const session = new Session();
        session.sessionId = sessionID;
        session.user_id = user.id; 
        session.expiresAt = new Date(new Date().getTime() + 180000);  

        await this.SessionRepository.save(session);

        const cookie = {"message" :"authethicated" , sessionIds: sessionID};
        return cookie;
    }

   




}
