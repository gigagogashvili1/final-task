import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common-lib/exception-filters';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('APPLICATION_PORT');

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Medicine')
    .setDescription('Medicine Api, where u can create patients, doctors and so on')
    .setVersion('1.0')
    .addTag('medicine')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  document['components']['securitySchemes'] = {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  };
  SwaggerModule.setup('/swagger', app, document);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
}
bootstrap();
