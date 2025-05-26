import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './constants/env.constants';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './interceptors/http-exceptions.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerOptions } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = ENV.PORT;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1/');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);

  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}

bootstrap();
