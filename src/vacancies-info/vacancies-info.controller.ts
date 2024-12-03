import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { VacanciesInfoService } from './vacancies-info.service';
import { UpdateVacancyInfoDto } from './dto/update-vacancy-info.dto';
import { CreateVacancyInfoDto } from './dto/create-vacancy-info.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Vacancy Info') // Название секции в Swagger
@Controller('vacancies-info')
export class VacanciesInfoController {
  constructor(private readonly vacanciesInfoService: VacanciesInfoService) {}

  @Post()
  @ApiOperation({ summary: 'Создать подробную информацию о вакансии' })
  create(@Body() createVacancyInfoDto: CreateVacancyInfoDto) {
    return this.vacanciesInfoService.create(createVacancyInfoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех описаний вакансий' })
  findAll() {
    return this.vacanciesInfoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить подробности одной вакансии' })
  @ApiParam({ name: 'id', description: 'ID описания вакансии' })
  findOne(@Param('id') id: string) {
    return this.vacanciesInfoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить описание вакансии' })
  @ApiParam({ name: 'id', description: 'ID описания вакансии' })
  update(@Param('id') id: string, @Body() updateVacancyInfoDto: UpdateVacancyInfoDto) {
    return this.vacanciesInfoService.update(+id, updateVacancyInfoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить описание вакансии' })
  @ApiParam({ name: 'id', description: 'ID описания вакансии' })
  remove(@Param('id') id: string) {
    return this.vacanciesInfoService.remove(+id);
  }
}
