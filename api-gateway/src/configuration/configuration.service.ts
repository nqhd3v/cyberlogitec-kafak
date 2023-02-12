import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import ConfigurationDto from './dto/configuration';
import { TerminalConfiguration } from './entities/configuration';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(TerminalConfiguration)
    private readonly terminalConfRepository: Repository<TerminalConfiguration>,
  ) {}

  public async create(data: ConfigurationDto): Promise<TerminalConfiguration> {
    try {
      const newTermData = this.terminalConfRepository.create(data);
      return await this.terminalConfRepository.save(newTermData);
    } catch (err) {
      console.error('Error when creating a new operation-type:', err);
      throw new Http400Exception();
    }
  }

  public async updateById(
    id: number,
    data: ConfigurationDto,
  ): Promise<TerminalConfiguration> {
    try {
      const currentCarrier = await this.terminalConfRepository.findOneBy({
        id,
      });
      const updateProb = { ...currentCarrier, ...data };
      return await this.terminalConfRepository.save(updateProb);
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
