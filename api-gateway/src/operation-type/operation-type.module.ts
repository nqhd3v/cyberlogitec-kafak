import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminalOperationType } from './entities/operation-type';
import { OperationTypeController } from './operation-type.controller';
import { OperationTypeService } from './operation-type.service';

@Module({
  controllers: [OperationTypeController],
  providers: [OperationTypeService],
  imports: [],
  exports: [OperationTypeService],
})
export class OperationTypeModule {}
