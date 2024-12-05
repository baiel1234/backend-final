import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

export async function createApp() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const config = new DocumentBuilder()
    .setTitle('Headhunter API')
    .setDescription('API documentation for the Headhunter backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  await app.init();

  return server;
}
