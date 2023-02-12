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
import OperationTypeDto from 'src/carrier-type/dto/carrier-type';
import ConfigurationDto from 'src/configuration/dto/configuration';
import CarrierTypeDto from 'src/operation-type/dto/carrier-type';
import { TERMINAL_FILENAMES } from 'utils/constants';
import { Http400Exception } from 'utils/Exception/http-400.exception';
import TerminalDto from './dto/terminal';
import TerminalFileInterceptor from './terminal-file.interceptor';
import { TerminalService } from './terminal.service';

@Controller('terminals')
export class TerminalController {
  constructor(private readonly srv: TerminalService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('/:id/:filename')
  async getImage(@Param() { id, filename }, @Res() res: any) {
    try {
      // const terminal = await this.srv.getById(id);
      // if (!terminal) {
      //   throw new Http400Exception('terminal.notfound');
      // }
      // if (!TERMINAL_FILENAMES.includes(filename)) {
      //   throw new Http400Exception('terminal.filename.invalid');
      // }
      // const filepath = terminal[`img_${filename}`];
      // if (!filepath) {
      //   res.send('');
      //   return;
      // }
      // const image = await readFile(join(process.cwd(), '/public', filepath));
      // res.contentType('image/jpeg');
      // res.send(image);
    } catch (err) {
      throw err;
    }
  }

  // Get all terminals
  @Get('')
  // @UseGuards(JwtAuthGuard)
  async getAll() {
    try {
      return await this.srv.getAll();
    } catch (err) {
      throw err;
    }
  }

  // Create a new terminal
  @Post('')
  // @UseGuards(JwtAuthGuard)
  async createOne(@Body() data: TerminalDto) {
    try {
      return await this.srv.createTerminal(data);
    } catch (err) {
      throw err;
    }
  }

  // @UseInterceptors(FileInterceptor('file', { dest: 'upload' }))
  @Post('/:id/upload')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(TerminalFileInterceptor({ fieldname: 'file' }))
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
  // @UseGuards(JwtAuthGuard)
  async addOperation(@Param() { id }, @Body() data: OperationTypeDto) {
    try {
      return await this.srv.addOperation(id, data);
    } catch (err) {
      throw err;
    }
  }

  // Add a new operation
  @Post('/:id/carrier')
  // @UseGuards(JwtAuthGuard)
  async addCarrier(@Param() { id }, @Body() data: CarrierTypeDto) {
    try {
      return await this.srv.addCarrier(id, data);
    } catch (err) {
      throw err;
    }
  }

  // Add a new operation
  @Post('/:id/configuration')
  // @UseGuards(JwtAuthGuard)
  async addConfiguration(@Param() { id }, @Body() data: ConfigurationDto) {
    try {
      return await this.srv.addConfiguration(id, data);
    } catch (err) {
      throw err;
    }
  }
}
