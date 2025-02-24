import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { FormService } from 'src/form/form.service';
import { SessionService } from './session.service';
import { form } from '../entity/form';
import { Session } from '../entity/session';


@Controller('session')
export class SessionController {

    constructor(private readonly sessionService:SessionService,
                private readonly formService :FormService
    ){}

    @Post('validate')
    async validate (@Req() request:Request ):Promise<any>{
         const sessions =  await this.sessionService.findSession(request.body.data.sessionId);
        const main_user = await this.formService.findUser(sessions.user_id);

        
        if(sessions && main_user){
             const form_user =  await this.formService.findUser(sessions.user_id);
             const user_data ={ name:form_user?.user_name }
             return user_data;
        }  
        return null;

        
    }
    @Delete('destroy')
    async deleteSession (@Body() body:{cookie:string}):Promise<any>{
        const { cookie } = body;
        const user =  await this.sessionService.delete(cookie);
        return user;
    }
    
}


