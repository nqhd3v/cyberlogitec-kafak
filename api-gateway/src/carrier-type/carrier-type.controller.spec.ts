import { Test, TestingModule } from '@nestjs/testing';
import { CarrierTypeController } from './carrier-type.controller';

describe('CarrierTypeController', () => {
  let controller: CarrierTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrierTypeController],
    }).compile();

    controller = module.get<CarrierTypeController>(CarrierTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
