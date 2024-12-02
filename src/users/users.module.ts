import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptModule } from 'src/auth/bcrypt.module'; // Импортируем BcryptModule

@Module({
  imports: [BcryptModule], // Добавляем BcryptModule в imports
  providers: [UsersService, PrismaService, JwtService],
  controllers: [UsersController],
})
export class UsersModule {}
