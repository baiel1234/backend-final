import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVacancyDto,  } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacanciesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVacancyDto: CreateVacancyDto) {
    return this.prisma.vacancy.create({
      data: createVacancyDto,
    });
  }

  async findAll() {
    return this.prisma.vacancy.findMany();
  }

  async findOne(id: number) {
    return this.prisma.vacancy.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateVacancyDto: UpdateVacancyDto) {
    return this.prisma.vacancy.update({
      where: { id },
      data: updateVacancyDto,
    });
  }

  async remove(id: number) {
    return this.prisma.vacancy.delete({
      where: { id },
    });
  }
}
