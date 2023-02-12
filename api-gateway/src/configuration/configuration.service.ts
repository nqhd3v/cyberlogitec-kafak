import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import ConfigurationDto from './dto/configuration';
import { TerminalConfiguration } from './entities/configuration';

@Injectable()
export class ConfigurationService {
  constructor(
    @Inject('TERMINAL_CFG_MICROSERVICE')
    private readonly cfgClient: ClientKafka,
  ) {}

  public async create(data: ConfigurationDto): Promise<TerminalConfiguration> {
    try {
      const res = await lastValueFrom(
        this.cfgClient.send('create-one', JSON.stringify(data)),
      );
      return res;
    } catch (err) {
      console.error('Error when creating a new operation-type:', err);
      throw new Http400Exception(err.message);
    }
  }

  public async updateById(
    id: number,
    data: ConfigurationDto,
  ): Promise<TerminalConfiguration> {
    try {
      const res = await lastValueFrom(
        this.cfgClient.send('update-by-id', JSON.stringify({ id, data })),
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
}
