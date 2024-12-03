import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
