import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CarrierTypeModule } from 'src/carrier-type/carrier-type.module';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { OperationTypeModule } from 'src/operation-type/operation-type.module';
import { TerminalController } from './terminal.controller';
import { TerminalService } from './terminal.service';

@Module({
  controllers: [TerminalController],
  providers: [TerminalService],
  imports: [
    ClientsModule.register([
      {
        name: 'TERMINAL_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'terminal-consumer',
          },
        },
      },
    ]),
    OperationTypeModule,
    CarrierTypeModule,
    ConfigurationModule,
    ConfigModule,
  ],
})
export class TerminalModule {}
