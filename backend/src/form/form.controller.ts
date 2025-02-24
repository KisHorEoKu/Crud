import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from 'src/dto/form';
import { form } from 'src/entity/form';
import { commonController } from 'src/controllers/commonController';
import { Response } from 'express';
import { Otp } from 'src/entity/otp';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from 'src/entity/token';
import { Session } from 'src/entity/session';
import { v4 as uuidv4 } from 'uuid'; 
import { AppService } from 'src/app.service';

@Controller('form')
export class FormController {
    constructor(private readonly formService:FormService,
        @InjectRepository(Otp)  private OtpRepository:Repository<Otp>,
        @InjectRepository(Token)  private tokenRepository:Repository<Token>,
        @InjectRepository(form)  private formRepository:Repository<form>,
        @InjectRepository(Session)  private sessionRepository:Repository<Session>,
        private readonly appService:AppService,
    ){}

    common = new commonController();
    

    @Post()
    async create(@Body() formDTO: CreateFormDTO): Promise<boolean> {
      const hashedPassword = await this.common.hashPassword(formDTO.password);
      formDTO.password = hashedPassword;
      const user = await this.formService.findUserByEmail(formDTO.email)
      if(!user){
            const form = await this.formService.create(formDTO);
            return true;
      }
      return false;
    }
    @Get('Getusers')
    async findAll():Promise<form[]>{
        return await this.formService.findAll();
    }

    @Get('getuser/:id')
    async findUser(@Param() id:number) {
        return await this.formService.findUser(id);
    }

    @Delete('delete')
    async delete(@Body() body: { id: number }): Promise<void> {
        return await this.formService.delete(body.id);
    }

    @Post('auth')
    async auth(@Body() body: { email: string, password: string },@Req() res:Response ): Promise<any> {
        const verified = this.common.hashPassword(body.password);
        const returnvalue = await  this.formService.auth(body.email, body.password,res);
        return returnvalue;
    }

    @Post('otp')
    async GenerateOtp (@Body() body: {phnumber:number}):Promise<Boolean>{
        const { phnumber } = body;
        return await this.formService.generateOtp(phnumber);

    }

    @Post('token/validate')
    async tokenValidate(@Body() body: {token:string,password:string,confirm_password:string}):Promise<Boolean>{
        const { token , password , confirm_password } = body;

       
        const tokens =  await this.formService.validateToken(token);
        if(tokens) {
            const expiredate = new Date(tokens?.expiryTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
            const currentDateTime = new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
             

            
              if(expiredate >= currentDateTime){
                const pass = await this.formService.hashGenerate(password)
                this.formRepository.update({ id: tokens.user_id }, { 
                    password: pass,
                    confirm_password: confirm_password
                  });
                  this.sessionRepository.delete(tokens.id)
                   return true
              }
              return false;


        }
        return false;
        


    }

    @Post('otp/validate')
    async validateOtp(@Body() body:{otp : number}):Promise<any>{
        const { otp } = body;
        const otps =  await this.formService.validateOtp(otp);
       
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

              
            if(expiredate >= currentDateTime){
                //can delete the session here 
                const phone = otps.phnumber +"";
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
                    const tokenRepo = await this.tokenRepository.save(tokens);
                    const link =`http://localhost:3000/form/reset?token=${tokenID}`

                    //here i m sending the mail in the email
                    this.appService.sendMailLink(user.email,link,user.full_name);     
                    return true;

                }
                

            }
            else {
                // const otpset = otp+""
            //    const Nooptverified = await this.OtpRepository.delete({otp :{otpset}})
                return false;
                
            }
        }       
        return false;
       
    }
}