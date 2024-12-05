import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export async function createApp() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API for the backend application')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  await app.init();

  return server;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('HeadHunter API')
    .setDescription('API для управления вакансиями и их подробной информацией')
    .setVersion('1.0')
    .addBearerAuth() // Если вы используете JWT, добавьте эту строку
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('App has been successfully initialized.');
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
