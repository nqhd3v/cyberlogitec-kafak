import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'user',
          brokers: ['localhost:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'user-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('User microservice is running...');
}
bootstrap();
