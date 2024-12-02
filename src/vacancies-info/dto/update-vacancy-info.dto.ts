import { PartialType } from '@nestjs/mapped-types';
import { CreateVacancyInfoDto } from './create-vacancy-info.dto';

export class UpdateVacancyInfoDto extends PartialType(CreateVacancyInfoDto) {}
