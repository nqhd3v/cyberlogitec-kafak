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
          clientId: 'auth',
          brokers: ['localhost:9092'],
        },
        producerOnlyMode: true,
        consumer: {
          groupId: 'auth-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Auth microservice is running...');
}
bootstrap();
