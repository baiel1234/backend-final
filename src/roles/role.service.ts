// src/roles/role.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  // Метод для добавления ролей при инициализации модуля
  async onModuleInit() {
    await this.createRoles();
  }

  // Функция для создания ролей
  private async createRoles() {
    const roles = ['Admin', 'Employer', 'JobSeeker'];

    for (const roleName of roles) {
      await this.prisma.role.upsert({
        where: { name: roleName },
        update: {}, // Если роль существует, не обновляем
        create: { name: roleName },
      });
    }
  }
}
