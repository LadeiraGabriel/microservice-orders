import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'orders',
      protoPath: join(
        __dirname,
        '/shared/infra/proto-order-delivery/protos/order.proto',
      ),
      url: 'localhost:5050',
    },
  });
  app.startAllMicroservices();
  app.useGlobalPipes(new ValidationPipe());
  const configSwagger = new DocumentBuilder()
    .setTitle('API Orders')
    .setDescription('Product Ordering API')
    .setVersion('1.1')
    .addTag('Orders')
    .addTag('Products')
    .addTag('Users')
    .addSecurity('bearerAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
