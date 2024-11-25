import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsInt()
  roleId?: number;  // Обновляем роль через roleId
}
