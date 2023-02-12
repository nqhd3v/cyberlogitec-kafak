import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarrierTypeService } from 'src/carrier-type/carrier-type.service';
import OperationTypeDto from 'src/carrier-type/dto/carrier-type';
import { ConfigurationService } from 'src/configuration/configuration.service';
import ConfigurationDto from 'src/configuration/dto/configuration';
import CarrierTypeDto from 'src/operation-type/dto/carrier-type';
import { OperationTypeService } from 'src/operation-type/operation-type.service';
import { Repository } from 'typeorm';
import { TERMINAL_FILENAMES } from 'utils/constants';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import TerminalDto from './dto/terminal';
import { TerminalInfo } from './entities/terminal-info';

@Injectable()
export class TerminalService {
  constructor(
    private readonly operationSrv: OperationTypeService,
    private readonly carrierSrv: CarrierTypeService,
    private readonly configurationSrv: ConfigurationService,
  ) {}

  public async createTerminal(
    data: TerminalDto, // : Promise<TerminalInfo>
  ) {
    try {
      // const newTermData = this.infoRepository.create(data);
      // return await this.infoRepository.save(newTermData);
    } catch (err) {
      console.error('Error when creating a new terminal:', err);
      throw new Http400Exception();
    }
  }

  public async updateById(id: number, data: TerminalDto) {
    try {
      // const curLang = await this.infoRepository.findOneBy({ id });
      // const updateProb = { ...curLang, ...data };
      // return await this.infoRepository.save(updateProb);
    } catch (err) {
      console.error('Error when updating a terminal with its id:', id, err);
      throw new Http400Exception();
    }
  }

  public async getAll() {
    // const terminals = await this.infoRepository
    //   .createQueryBuilder('i')
    //   .leftJoinAndSelect('i.operation_types', 'opr')
    //   .leftJoinAndSelect('i.carrier_types', 'crr')
    //   .leftJoinAndSelect('i.configurations', 'conf')
    //   .getMany();
    // return terminals;
  }

  public async getById(id: number) {
    // const terminal = await this.infoRepository
    //   .createQueryBuilder('i')
    //   .leftJoinAndSelect('i.operation_types', 'opr')
    //   .leftJoinAndSelect('i.carrier_types', 'crr')
    //   .leftJoinAndSelect('i.configurations', 'conf')
    //   .where('i.id = :id', { id })
    //   .getOne();
    // return terminal;
  }

  public async addOperation(id: number, data: OperationTypeDto) {
    // const terminal = await this.getById(id);
    // if (!terminal) {
    //   throw new Http400Exception('terminal.notfound');
    // }
    // const newOpr = await this.operationSrv.create(data);
    // terminal.operation_types.push(newOpr);
    // return await this.infoRepository.save(terminal);
  }

  public async addCarrier(id: number, data: CarrierTypeDto) {}

  public async addConfiguration(id: number, data: ConfigurationDto) {
    // const terminal = await this.getById(id);
    // if (!terminal) {
    //   throw new Http400Exception('terminal.notfound');
    // }
    // const newConf = await this.configurationSrv.create(data);
    // terminal.configurations.push(newConf);
    // return await this.infoRepository.save(terminal);
  }

  public async addImage(id: number, filename: string, filepath: string) {
    // const terminal = await this.getById(id);
    // if (!terminal) {
    //   throw new Http400Exception('terminal.notfound');
    // }
    // if (!TERMINAL_FILENAMES.includes(filename)) {
    //   throw new Http400Exception('terminal.filename.invalid');
    // }
    // terminal[`img_${filename}`] = filepath;
    // return await this.infoRepository.save(terminal);
  }
}
