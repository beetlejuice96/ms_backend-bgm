import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AxiosExceptionFilter } from './common/filters/axios-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // envs
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalFilters(new AxiosExceptionFilter());

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validateCustomDecorators: true,
      stopAtFirstError: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('ms_socket')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
}
bootstrap();
