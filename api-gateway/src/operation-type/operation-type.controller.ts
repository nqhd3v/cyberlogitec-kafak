import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import OperationTypeDto from 'src/carrier-type/dto/carrier-type';
import { OperationTypeService } from './operation-type.service';

@Controller('operations')
export class OperationTypeController {
  constructor(private readonly srv: OperationTypeService) {}

  @Patch('/:id')
  async updateById(@Param() { id }, @Body() data: OperationTypeDto) {
    try {
      return await this.srv.updateById(id, data);
    } catch (err) {
      throw err;
    }
  }

  @Post('/')
  async createOne(@Body() data: OperationTypeDto) {
    try {
      return await this.srv.create(data);
    } catch (err) {
      throw err;
    }
  }
}
