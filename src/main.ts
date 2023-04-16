import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

dotenv.config();

async function bootstrap () {
  const app = await NestFactory.create(AppModule);

  // exception filters
  // const { httpAdapter } = app.get(HttpAdapterHost)
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
  app.useGlobalFilters(new HttpExceptionFilter());
  // ValidationPipe
  app.useGlobalPipes(new ValidationPipe())

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Hospital API')
    .setDescription('The Hospital API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //ValidationPipe
  app.useGlobalPipes(new ValidationPipe())

  //CORS
  app.enableCors()

  await app.listen(process.env.PORT);
}
bootstrap();
