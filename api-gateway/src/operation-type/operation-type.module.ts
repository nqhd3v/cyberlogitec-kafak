import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OperationTypeController } from './operation-type.controller';
import { OperationTypeService } from './operation-type.service';

@Module({
  controllers: [OperationTypeController],
  providers: [OperationTypeService],
  imports: [
    ClientsModule.register([
      {
        name: 'TERMINAL_OPR_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal-opr',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'terminal-opr-consumer',
          },
        },
      },
    ]),
  ],
  exports: [OperationTypeService],
})
export class OperationTypeModule {}
