import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from 'src/dto/form';
import { form } from 'src/entity/form';
import { get } from 'http';
import { commonController } from 'src/controllers/commonController';
import { Response } from 'express';
import { Otp } from 'src/entity/otp';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/entity/token';
import { Session } from 'src/entity/session';
import { v4 as uuidv4 } from 'uuid'; 
import { AppService } from 'src/app.service';
import { session } from 'src/entity/sessions';

@Controller('form')
export class FormController {
    constructor(private readonly formService:FormService,
        @InjectRepository(Otp)  private OtpRepository:Repository<Otp>,
        @InjectRepository(Token)  private tokenRepository:Repository<Token>,
        @InjectRepository(form)  private formRepository:Repository<form>,
        // @InjectRepository(session)  private sessionRepository:Repository<session>,
        private readonly appService:AppService,
    ){}

    common = new commonController();

    @Post()
    async create(@Body() formDTO: CreateFormDTO): Promise<form> {
      const hashedPassword = await this.common.hashPassword(formDTO.password);
      formDTO.password = hashedPassword;
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
    async auth(@Body() body: { email: string, password: string },@Req() res:Response ): Promise<any> {
        const verified = this.common.hashPassword(body.password);
        return await  this.formService.auth(body.email, body.password,res);
    }

    @Post('otp')
    async GenerateOtp (@Body() body: {phnumber:number}):Promise<Boolean>{
        const { phnumber } = body;
        return await this.formService.generateOtp(phnumber);

    }
    @Post('otp/validate')
    async validateOtp(@Body() body:{otp : number}):Promise<any>{
        const { otp } = body;
        console.log(otp)
        const otps =  await this.formService.validateOtp(otp);
        console.log(otps);
       
        if(otps) {
            const expiredate = new Date(otps?.expiryTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
            const currentDateTime = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
              console.log(expiredate)
              console.log(currentDateTime)
              console.log(expiredate >= currentDateTime)

              
            if(expiredate >= currentDateTime){
                //can delete the session here 
                const sessionUpdate = await this.OtpRepository.update({  }, { isVerified: true });
                const phone = otps.phnumber +" ";
                const user = await this.formRepository.findOne({where:{phone}})
                const id = otps.id;
                this.OtpRepository.delete(id);

                if(user){
                    const tokenID = uuidv4();
                    const tokens = new Token();
                    tokens.token = tokenID;
                    tokens.user_id = user?.id;
                    tokens.isVerified = false;
                    tokens.expiryTime =new Date(new Date().getTime() + 1800000); 
                    const tokenRepo = this.tokenRepository.create(tokens);
                    const link =`http://localhost:5000/form/reset?q=${tokenID}`
                    console.log(link);

                    //here i m sending the mail in the email
                    // this.appService.sendMailLink(user.email,"",user.full_name);
                
                    return true;

                }
                

            }
            else {
                // const otpset = otp+""
                // console.log(otp, otpset)
            //    const Nooptverified = await this.OtpRepository.delete({otp :{otpset}})
                return false;
                
            }
        }       
        return false;
       
    }
}