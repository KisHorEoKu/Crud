import { IsString, IsNumber } from 'class-validator';
 
export class CreateUserDto{

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phno:string;

}