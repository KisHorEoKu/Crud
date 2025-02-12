import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entity/session';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {
    constructor(@InjectRepository(Session) private sessionRepository:Repository<any>){}

    async findSession( sessionId:string):Promise<Session>{
        const user = await this.sessionRepository.findOne({where:{sessionId}});
        return user;
    }
    async delete(sessionId:string):Promise<any>{
       const user =  await this.sessionRepository.delete({sessionId : sessionId})
       return user;
    }
}
