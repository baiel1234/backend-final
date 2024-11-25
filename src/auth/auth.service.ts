import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from './bcrypt.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  // Регистрация нового пользователя
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // Проверка, существует ли уже пользователь с таким email
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    // Хеширование пароля перед сохранением
    const hashedPassword = await this.bcryptService.hashPassword(password);

    // Создание нового пользователя
    const user = await this.prisma.user.create({
        data: {
          email,  // Используйте email из registerDto
          password: hashedPassword,
          roleId: 1,  // Передайте правильный roleId из dto
        },
      });

    // Генерация JWT токена для пользователя
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  // Логин пользователя
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Поиск пользователя по email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Проверка пароля
    const isPasswordValid = await this.bcryptService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Генерация JWT токена
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
