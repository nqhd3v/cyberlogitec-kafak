import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  imports: [
    ClientsModule.register([
      {
        name: 'TERMINAL_CFG_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'terminal-cfg',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'terminal-cfg-consumer',
          },
        },
      },
    ]),
  ],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
