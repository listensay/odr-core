import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 设置全局路由前缀
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Odr-core API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('odr-core-api', app, documentFactory);

  await app.listen(process.env.PORT ?? 8080);
  console.log('项目端口成功运行：http://localhost:8080/');
  console.log('API 地址: http://localhost:8080/api');
  console.log('Swagger: http://localhost:8080/odr-core-api');
}
bootstrap();
