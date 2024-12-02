import { Controller,Patch, Post,UseGuards, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { RoleIds } from '../roles/roles.decorator'; // Путь должен быть правильным в зависимости от вашей структуры файлов
import { RolesGuard } from '../roles/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Получение пользователя по ID
  @Get(':id')
  @RoleIds(1) // Доступ только для пользователей с roleId == 1 (например, для администраторов)
  @UseGuards(RolesGuard) // Использование RolesGuard для защиты маршрута
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  // Обновление пользователя
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/role')
async updateUserRole(
  @Param('id') id: string, // id приходит как строка из URL
  @Body('roleId') roleId: number,
) {
  const userId = parseInt(id, 10); // Преобразуем строку в число
  return this.usersService.updateRole(userId, roleId);
}


  
  // Удаление пользователя
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  // Получение списка всех пользователей
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }


}
