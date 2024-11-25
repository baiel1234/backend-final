import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto, UpdateJobDto } from './dto/jobs.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.job.findMany();
  }

  async create(data: CreateJobDto) {
    return this.prisma.job.create({ data });
  }

  async update(id: number, data: UpdateJobDto) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
