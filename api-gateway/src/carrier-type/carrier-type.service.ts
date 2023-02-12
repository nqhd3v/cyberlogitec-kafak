import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import CarrierTypeDto from 'src/operation-type/dto/carrier-type';
import { Http503Exception } from 'utils/Exception/http-503.exception';
import { TerminalCarrierType } from './entities/carrier-type';

@Injectable()
export class CarrierTypeService {
  constructor(
    @Inject('TERMINAL_CARRIER_MICROSERVICE')
    private readonly carrierClient: ClientKafka,
  ) {}

  public async create(data: CarrierTypeDto): Promise<TerminalCarrierType> {
    try {
      const res = await lastValueFrom(
        this.carrierClient.send('create-one', JSON.stringify(data)),
      );
      return res;
    } catch (err) {
      throw new Http503Exception(err.message);
    }
  }

  public async updateById(
    id: number,
    data: CarrierTypeDto,
  ): Promise<TerminalCarrierType> {
    try {
      const res = await lastValueFrom(
        this.carrierClient.send('update-by-id', JSON.stringify({ id, data })),
      );
      return res;
    } catch (err) {
      throw new Http503Exception(err.message);
    }
  }

  async onModuleInit() {
    this.carrierClient.subscribeToResponseOf('create-one');
    this.carrierClient.subscribeToResponseOf('update-by-id');
    await this.carrierClient.connect();
  }
}
