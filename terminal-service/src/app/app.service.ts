import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateDto from './dto/create';
import { TerminalInfo } from './entities/terminal-info';
import { BadReqException } from 'utils/Exception/bad-request.exception';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TerminalInfo)
    private readonly infoRepository: Repository<TerminalInfo>,
  ) {}

  public async createTerminal(data: CreateDto): Promise<TerminalInfo> {
    try {
      const newTermData = this.infoRepository.create(data);
      return await this.infoRepository.save(newTermData);
    } catch (err) {
      console.error('Error when creating a new terminal:', err);
      throw new BadReqException(err.message);
    }
  }

  public async updateById(
    id: number,
    data: CreateDto,
  ): Promise<TerminalInfo> {
    try {
      const curLang = await this.infoRepository.findOneBy({ id });
      const updateProb = { ...curLang, ...data };
      return await this.infoRepository.save(updateProb);
    } catch (err) {
      console.error('Error when updating a terminal with its id:', id, err);
      throw new BadReqException(err.message);
    }
  }

  public async getAll(): Promise<TerminalInfo[]> {
    const terminals = await this.infoRepository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.operation_types', 'opr')
      .leftJoinAndSelect('i.carrier_types', 'crr')
      .leftJoinAndSelect('i.configurations', 'conf')
      .getMany();
    return terminals;
  }

  public async getById(id: number): Promise<TerminalInfo> {
    const terminal = await this.infoRepository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.operation_types', 'opr')
      .leftJoinAndSelect('i.carrier_types', 'crr')
      .leftJoinAndSelect('i.configurations', 'conf')
      .where('i.id = :id', { id })
      .getOne();
    return terminal;
  }
}
