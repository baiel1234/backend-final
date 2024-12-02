import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleModule } from './roles/roles.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { VacanciesModule } from './vacancies/vacancies.module';
import { VacanciesInfoService } from './vacancies-info/vacancies-info.service';
import { VacanciesInfoController } from './vacancies-info/vacancies-info.controller';
import { VacanciesInfoModule } from './vacancies-info/vacancies-info.module';

@Module({
  imports: [AuthModule, RoleModule, UsersModule, JwtModule.register({ secret: 'secret-key' }), VacanciesModule, VacanciesInfoModule],
  controllers: [VacanciesInfoController],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    VacanciesInfoService,
  ],
})
export class AppModule {}
