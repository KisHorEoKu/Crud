import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  rn: number;

  @IsNumber()
  year: number;

  @IsNumber()
  mob: string;

  @IsString()
  address: string;

  @IsArray()
  sports: string[];

  @IsNumber()
  scholarship: number;

  @IsOptional()
  @IsString()
  comments: string;
}
