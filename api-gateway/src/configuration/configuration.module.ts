import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationController } from './configuration.controller';
import { ConfigurationService } from './configuration.service';
import { TerminalConfiguration } from './entities/configuration';

@Module({
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  imports: [TypeOrmModule.forFeature([TerminalConfiguration])],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
