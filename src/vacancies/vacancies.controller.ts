import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto,  } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  async create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  async findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.findOne(id);
  }

  @Patch(':id')
async update(
  @Param('id', ParseIntPipe) id: number, // Преобразует строку в число
  @Body() updateVacancyDto: UpdateVacancyDto,
) {
  return this.vacanciesService.update(id, updateVacancyDto);
}

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.vacanciesService.remove(id);
  }
}
