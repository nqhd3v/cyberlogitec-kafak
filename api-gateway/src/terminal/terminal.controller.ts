import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import JwtAuthGuard from 'src/auth/gaurd/jwt.gaurd';
import { CarrierTypeService } from 'src/carrier-type/carrier-type.service';
import OperationTypeDto from 'src/carrier-type/dto/carrier-type';
import { ConfigurationService } from 'src/configuration/configuration.service';
import ConfigurationDto from 'src/configuration/dto/configuration';
import CarrierTypeDto from 'src/operation-type/dto/carrier-type';
import { OperationTypeService } from 'src/operation-type/operation-type.service';
import { TERMINAL_FILENAMES } from 'utils/constants';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import TerminalDto from './dto/terminal';
import TerminalFileInterceptor from './terminal-file.interceptor';
import { TerminalService } from './terminal.service';

@Controller('terminals')
export class TerminalController {
  constructor(
    private readonly srv: TerminalService,
    private readonly oprSrv: OperationTypeService,
    private readonly carrierSrv: CarrierTypeService,
    private readonly configSrv: ConfigurationService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/:id/:filename')
  async getImage(@Param() { id, filename }, @Res() res: any) {
    try {
      const terminal = await this.srv.getById(id);
      if (!terminal) {
        throw new Http400Exception('terminal.notfound');
      }
      if (!TERMINAL_FILENAMES.includes(filename)) {
        throw new Http400Exception('terminal.filename.invalid');
      }
      const filepath = terminal[`img_${filename}`];
      if (!filepath) {
        res.send('');
        return;
      }
      const image = await readFile(join(process.cwd(), '/public', filepath));
      res.contentType('image/jpeg');
      res.send(image);
    } catch (err) {
      throw err;
    }
  }

  // Get all terminals
  @Get('')
  @UseGuards(JwtAuthGuard)
  async getAll() {
    try {
      return await this.srv.getAll();
    } catch (err) {
      throw err;
    }
  }

  // Create a new terminal
  @Post('')
  @UseGuards(JwtAuthGuard)
  async createOne(@Body() data: TerminalDto) {
    try {
      return await this.srv.createTerminal(data);
    } catch (err) {
      throw err;
    }
  }

  // @UseInterceptors(FileInterceptor('file', { dest: 'upload' }))
  @Post('/:id/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TerminalFileInterceptor({ fieldname: 'file' }))
  async uploadFile(
    @Param() { id },
    @Body() data,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const filepath = file.path.replace(join(process.cwd(), 'public'), '');
      return await this.srv.addImage(id, data.filename, filepath);
    } catch (err) {
      throw err;
    }
  }

  // Add a new operation
  @Post('/:id/operation')
  @UseGuards(JwtAuthGuard)
  async addOperation(@Param() { id }, @Body() data: OperationTypeDto) {
    try {
      const termInfo = await this.srv.getById(id);
      if (!termInfo) {
        throw new Http400Exception('terminal.notfound');
      }

      const newOpr = await this.oprSrv.create(data);
      termInfo.operation_types.push(newOpr);
      return await this.srv.updateById(id, termInfo);
    } catch (err) {
      throw err;
    }
  }

  // Add a new operation
  @Post('/:id/carrier')
  @UseGuards(JwtAuthGuard)
  async addCarrier(@Param() { id }, @Body() data: CarrierTypeDto) {
    try {
      const termInfo = await this.srv.getById(id);
      if (!termInfo) {
        throw new Http400Exception('terminal.notfound');
      }

      const newCarrier = await this.carrierSrv.create(data);
      termInfo.carrier_types.push(newCarrier);
      return await this.srv.updateById(id, termInfo);
    } catch (err) {
      throw err;
    }
  }

  // Add a new operation
  @Post('/:id/configuration')
  @UseGuards(JwtAuthGuard)
  async addConfiguration(@Param() { id }, @Body() data: ConfigurationDto) {
    try {
      const termInfo = await this.srv.getById(id);
      if (!termInfo) {
        throw new Http400Exception('terminal.notfound');
      }

      const newConf = await this.configSrv.create(data);
      termInfo.configurations.push(newConf);
      return await this.srv.updateById(id, termInfo);
    } catch (err) {
      throw err;
    }
  }
}
