import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDTO } from 'src/dto/form';
import { form } from 'src/entity/form';
import { get } from 'http';
import { commonController } from 'src/controllers/commonController';
import { Response } from 'express';
import { Otp } from 'src/entity/otp';




@Controller('form')
export class FormController {
    constructor(private readonly formService:FormService,){}

    common = new commonController();

    @Post()
    async create(@Body() formDTO: CreateFormDTO): Promise<form> {
      const hashedPassword = await this.common.hashPassword(formDTO.password);
      formDTO.password = hashedPassword;
    //   console.log(hashedPassword);
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
        console.log(otps)
       
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

            if(expiredate > currentDateTime){return true;}
            else return false;
        }       
           return false;
       
    }
}