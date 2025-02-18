import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { form } from 'src/entity/form';
import { CreateFormDTO } from 'src/dto/form';
import { Repository } from 'typeorm';
import { commonController } from 'src/controllers/commonController';
import { v4 as uuidv4 } from 'uuid'; 
import { Session } from '../entity/session';
import { Response } from 'express';
import { Otp } from '../entity/otp';
import { AppService } from 'src/app.service';
import { Token } from 'src/entity/token';

@Injectable()
export class FormService {
    constructor(@InjectRepository(form)  private formRepository:Repository<form>,
                @InjectRepository(Session)  private SessionRepository:Repository<Session>,
                @InjectRepository(Otp)  private OtpRepository:Repository<Otp>,
                @InjectRepository(Token)  private TokenRepository:Repository<Token>,
                private readonly Appservice:AppService

             ){}
                common = new commonController();

    async create(formDTO:CreateFormDTO):Promise<form>{
        const formObj = this.formRepository.create(formDTO);
        return await  this.formRepository.save(formObj);

    }
    async findAll(): Promise<form[]> {
        return await this.formRepository.find({
            select: ["id", "email", "full_name", "user_name", "phone", "grade", "sports", "gender"]
        });
    }

    async delete(id:number):Promise<void>{
        console.log(id);
        await this.formRepository.delete(id);
    }
    async findUser(id:number){
        return await this.formRepository.findOne({where:{id}});
    }
    async findUserByEmail(email: string) {
        return await this.formRepository.findOne({ where: { email } });
    }
    
    async validateOtp(otp:number){
        return await this.OtpRepository.findOne({where: { otp } });
    }
    async generateOtp(phnumber:number): Promise<Boolean> {
        const phone = phnumber+""
        const user = await this.formRepository.findOne({where:{phone}})
        if(user){
            const otp = Math.floor(1000 + Math.random() * 9000);
            const expiryTime = new Date();
            expiryTime.setSeconds(expiryTime.getSeconds() + 30);
            const otpRecord = await this.OtpRepository.save({
                phnumber:phone,
                otp,
                expiryTime,
                isVerified: false,
            })
            this.Appservice.sendMail(user.email,otpRecord.otp,user.full_name);
            return true;
        }
        
       return false;
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
    async validateToken(token:string):Promise<any>{
        const tokenz = await this.TokenRepository.findOne({where:{token}})  ;
        return tokenz;
    }
    async hashGenerate(password:string):Promise<string>{
        const hashedPassword = await this.common.hashPassword(password);
        return hashedPassword;

    }

}
