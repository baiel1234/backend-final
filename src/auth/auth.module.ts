import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',  // Используйте более безопасный ключ
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy, BcryptService],
  controllers: [AuthController],
})
export class AuthModule {}
