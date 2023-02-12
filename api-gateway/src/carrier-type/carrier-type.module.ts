import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarrierTypeController } from './carrier-type.controller';
import { CarrierTypeService } from './carrier-type.service';

@Module({
  controllers: [CarrierTypeController],
  providers: [CarrierTypeService],
  imports: [
    ClientsModule.register([
      {
        name: 'TERMINAL_CARRIER_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal-carrier',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'terminal-carrier-consumer',
          },
        },
      },
    ]),
  ],
  exports: [CarrierTypeService],
})
export class CarrierTypeModule {}
