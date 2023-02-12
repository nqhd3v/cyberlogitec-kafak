import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from 'src/auth/gaurd/jwt.gaurd';
import { ConfigurationService } from './configuration.service';
import ConfigurationDto from './dto/configuration';
import { TerminalConfiguration } from './entities/configuration';

@Controller('configurations')
export class ConfigurationController {
  constructor(private readonly srv: ConfigurationService) {}

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateById(@Param() { id }, @Body() data: ConfigurationDto) {
    try {
      return await this.srv.updateById(id, data);
    } catch (err) {
      throw err;
    }
  }

  @Post('/')
  // @UseGuards(JwtAuthGuard)
  async createOne(
    @Body() data: ConfigurationDto,
  ): Promise<TerminalConfiguration> {
    try {
      return await this.srv.create(data);
    } catch (err) {
      throw err;
    }
  }
}
