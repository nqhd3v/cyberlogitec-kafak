import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import OperationTypeDto from 'src/carrier-type/dto/carrier-type';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import { TerminalOperationType } from './entities/operation-type';

@Injectable()
export class OperationTypeService {
  constructor(
    @Inject('TERMINAL_OPR_MICROSERVICE')
    private readonly oprClient: ClientKafka,
  ) {}

  public async create(data: OperationTypeDto): Promise<TerminalOperationType> {
    try {
      const res = await lastValueFrom(
        this.oprClient.send('create-one', JSON.stringify(data)),
      );
      return res;
    } catch (err) {
      console.error('Error when creating a new operation-type:', err);
      throw new Http400Exception(err.message);
    }
  }

  public async updateById(
    id: number,
    data: OperationTypeDto,
  ): Promise<TerminalOperationType> {
    try {
      const res = await lastValueFrom(
        this.oprClient.send('update-by-id', JSON.stringify({ id, data })),
      );
      return res;
    } catch (err) {
      console.error(
        'Error when updating a operation-type with its id:',
        id,
        err,
      );
      throw new Http400Exception(err.message);
    }
  }

  async onModuleInit() {
    this.oprClient.subscribeToResponseOf('create-one');
    this.oprClient.subscribeToResponseOf('update-by-id');
    await this.oprClient.connect();
  }
}
