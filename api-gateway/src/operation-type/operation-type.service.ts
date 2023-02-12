import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OperationTypeDto from 'src/carrier-type/dto/carrier-type';
import { Repository } from 'typeorm';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import { TerminalOperationType } from './entities/operation-type';

@Injectable()
export class OperationTypeService {
  constructor(
    @InjectRepository(TerminalOperationType)
    private readonly operationRepository: Repository<TerminalOperationType>,
  ) {}

  public async create(data: OperationTypeDto): Promise<TerminalOperationType> {
    try {
      const newTermData = this.operationRepository.create(data);
      return await this.operationRepository.save(newTermData);
    } catch (err) {
      console.error('Error when creating a new operation-type:', err);
      throw new Http400Exception();
    }
  }

  public async updateById(
    id: number,
    data: OperationTypeDto,
  ): Promise<TerminalOperationType> {
    try {
      const currentCarrier = await this.operationRepository.findOneBy({ id });
      const updateProb = { ...currentCarrier, ...data };
      return await this.operationRepository.save(updateProb);
    } catch (err) {
      console.error(
        'Error when updating a operation-type with its id:',
        id,
        err,
      );
      throw new Http400Exception();
    }
  }
}
