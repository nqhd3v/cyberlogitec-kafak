import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import CarrierTypeDto from 'src/operation-type/dto/carrier-type';

@Injectable()
export class CarrierTypeService {
  constructor(
    @Inject('CARRIER_MICROSERVICE')
    private readonly carrierClient: ClientKafka,
  ) {}

  public async create(data: CarrierTypeDto) {
    this.carrierClient.emit('create', JSON.stringify(data));
  }

  public async updateById(id: number, data: CarrierTypeDto) {
    this.carrierClient.emit('update_by_id', JSON.stringify({ id, data }));
  }
}
