import { IsEmail, IsString, IsArray, IsNotEmpty, IsIn, IsOptional, MinLength, IsNumber } from 'class-validator';

export class CreateFormDTO {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  user_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @IsNotEmpty()
  @IsIn(['10', '12'])
  grade: string;

  @IsNotEmpty()
  @IsIn(['male', 'female', 'not']) 
  gender: string;

  @IsArray()
  @IsOptional()
  sports: string[];
}
