import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from 'src/auth/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  // Получение пользователя по ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
        where: {
          id: Number(id),  // Преобразуем число в строку
        }
      });
      

  }

  // Обновление пользователя
  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
        where: {
            id: Number(id),  // Преобразуем число в строку
          },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async updateRole(userId: number, roleId: number) {
    return this.prisma.user.update({
      where: {
        id: userId, // Передаем userId как число
      },
      data: {
        roleId, // Передаем roleId как есть
      },
    });
  }
  
  

  // Удаление пользователя
  async remove(id: number) {
    const user = await this.prisma.user.delete({
        where: {
            id: Number(id),  // Преобразуем число в строку
          }
    });

    return { message: 'User deleted successfully', user };
  }

  // Получение всех пользователей
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany(); // Запрос на получение всех пользователей
  }
}

