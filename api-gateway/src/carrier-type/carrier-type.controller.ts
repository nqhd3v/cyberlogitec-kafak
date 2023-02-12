import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import CarrierTypeDto from 'src/operation-type/dto/carrier-type';
import { CarrierTypeService } from './carrier-type.service';

@Controller('carriers')
export class CarrierTypeController {
  constructor(private readonly srv: CarrierTypeService) {}

  @Patch('/:id')
  updateById(@Param() { id }, @Body() data: CarrierTypeDto) {
    return this.srv.updateById(id, data);
  }

  @Post('/')
  createOne(@Body() data: CarrierTypeDto) {
    return this.srv.create(data);
  }
}
