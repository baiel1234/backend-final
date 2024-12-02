import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_IDS_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roleIds = this.reflector.get<number[]>(ROLE_IDS_KEY, context.getHandler());
    if (!roleIds) {
      return true; // Если роли не указаны, доступ открыт для всех
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Извлекаем JWT токен
    if (!token) {
      throw new ForbiddenException('Access denied, token missing');
    }

    const decoded = this.jwtService.decode(token) as { sub: number };
    const user = await this.prisma.user.findUnique({
      where: { id: decoded.sub },
      include: { role: true }, // Включаем роль пользователя для проверки
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Проверяем, что роль пользователя соответствует одной из указанных
    const hasRole = roleIds.some((roleId) => roleId === user.roleId);
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
