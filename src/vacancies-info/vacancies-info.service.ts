import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateVacancyInfoDto } from './dto/update-vacancy-info.dto';
import { CreateVacancyInfoDto } from './dto/create-vacancy-info.dto';

@Injectable()
export class VacanciesInfoService {
  constructor(private prisma: PrismaService) {}

  async create(createVacancyInfoDto: CreateVacancyInfoDto) {
    return this.prisma.vacancyInfo.create({
      data: createVacancyInfoDto,
    });
  }

  async findAll() {
    return this.prisma.vacancyInfo.findMany({
      include: { vacancy: true }, // Включить данные вакансии
    });
  }

  async findOne(id: number) {
    const vacancyInfo = await this.prisma.vacancyInfo.findUnique({
      where: { id },
      include: { vacancy: true },
    });

    if (!vacancyInfo) {
      throw new NotFoundException('Vacancy info not found');
    }

    return vacancyInfo;
  }

  async update(id: number, updateVacancyInfoDto: UpdateVacancyInfoDto) {
    return this.prisma.vacancyInfo.update({
      where: { id },
      data: updateVacancyInfoDto,
    });
  }

  async remove(id: number) {
    return this.prisma.vacancyInfo.delete({
      where: { id },
    });
  }
}
