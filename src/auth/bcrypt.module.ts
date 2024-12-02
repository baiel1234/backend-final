import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService], // Экспортируем, чтобы использовать в других модулях
})
export class BcryptModule {}
