import { Test, TestingModule } from '@nestjs/testing';
import { CarrierTypeService } from './carrier-type.service';

describe('CarrierTypeService', () => {
  let service: CarrierTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrierTypeService],
    }).compile();

    service = module.get<CarrierTypeService>(CarrierTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
