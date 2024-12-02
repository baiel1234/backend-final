import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;  // Используем roleId, а не name роли
}
