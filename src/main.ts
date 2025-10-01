import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Odr-core API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('odr-core-api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
  console.log('项目端口成功运行：http://localhost:8080/');
  console.log('Swagger: http://localhost:8080/odr-core-api');
}
bootstrap();
