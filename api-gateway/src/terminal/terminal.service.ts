import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TERMINAL_FILENAMES } from 'utils/constants';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import TerminalDto from './dto/terminal';
import { TerminalInfo } from './entities/terminal-info';

@Injectable()
export class TerminalService {
  constructor(
    @Inject('TERMINAL_MICROSERVICE')
    private readonly terminalClient: ClientKafka,
  ) {}

  public async createTerminal(data: TerminalDto): Promise<TerminalInfo> {
    try {
      const res = await lastValueFrom(
        this.terminalClient.send('create-one', JSON.stringify(data)),
      );
      return res;
    } catch (err) {
      console.error('Error when creating a new terminal:', err);
      throw new Http400Exception(err.message);
    }
  }

  public async updateById(
    id: number,
    data: TerminalDto,
  ): Promise<TerminalInfo> {
    try {
      const res = await lastValueFrom(
        this.terminalClient.send('update-by-id', JSON.stringify(data)),
      );
      return res;
    } catch (err) {
      console.error('Error when updating a terminal with its id:', id, err);
      throw new Http400Exception(err.message);
    }
  }

  public async getAll(): Promise<TerminalInfo[]> {
    try {
      const res = await lastValueFrom(this.terminalClient.send('get', '{}'));
      return res;
    } catch (err) {
      throw new Http400Exception(err.message);
    }
  }

  public async getById(id: number): Promise<TerminalInfo> {
    try {
      const res = await lastValueFrom(
        this.terminalClient.send('get-by-id', JSON.stringify({ id })),
      );
      return res;
    } catch (err) {
      throw new Http400Exception(err.message);
    }
  }

  public async addImage(id: number, filename: string, filepath: string) {
    const terminal = await this.getById(id);
    if (!terminal) {
      throw new Http400Exception('terminal.notfound');
    }
    if (!TERMINAL_FILENAMES.includes(filename)) {
      throw new Http400Exception('terminal.filename.invalid');
    }
    terminal[`img_${filename}`] = filepath;
    return await this.updateById(id, terminal);
  }

  async onModuleInit() {
    this.terminalClient.subscribeToResponseOf('get-by-id');
    this.terminalClient.subscribeToResponseOf('get');
    this.terminalClient.subscribeToResponseOf('update-by-id');
    this.terminalClient.subscribeToResponseOf('create-one');
    await this.terminalClient.connect();
  }
}
