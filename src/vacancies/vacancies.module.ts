import { Module } from '@nestjs/common';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VacanciesController],
  providers: [VacanciesService,PrismaService]
})
export class VacanciesModule {}
