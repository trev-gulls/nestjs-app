import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { SequelizeValidationFilter } from './filters/sequelize-validation.filter';

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new SequelizeValidationFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest example')
    .setDescription('The nest API description')
    .setVersion('1.0')
    .addTag('nest')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // const metadatas = (getFromContainer(MetadataStorage) as any)
  //   .validationMetadatas;
  // document.components.schemas = validationMetadatasToSchemas(metadatas);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  return app;
}

bootstrap().then(async (app) => console.log(await app.getUrl()));
