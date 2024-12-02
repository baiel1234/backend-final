import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  }
  