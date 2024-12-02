import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { VacanciesInfoService } from './vacancies-info.service';
import { UpdateVacancyInfoDto } from './dto/update-vacancy-info.dto';
import { CreateVacancyInfoDto } from './dto/create-vacancy-info.dto';

@Controller('vacancies-info')
export class VacanciesInfoController {
  constructor(private readonly vacanciesInfoService: VacanciesInfoService) {}

  @Post()
  create(@Body() createVacancyInfoDto: CreateVacancyInfoDto) {
    return this.vacanciesInfoService.create(createVacancyInfoDto);
  }

  @Get()
  findAll() {
    return this.vacanciesInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacanciesInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacancyInfoDto: UpdateVacancyInfoDto,
  ) {
    return this.vacanciesInfoService.update(+id, updateVacancyInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanciesInfoService.remove(+id);
  }
}
