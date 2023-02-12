import { Test, TestingModule } from '@nestjs/testing';
import { OperationTypeService } from './operation-type.service';

describe('OperationTypeService', () => {
  let service: OperationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperationTypeService],
    }).compile();

    service = module.get<OperationTypeService>(OperationTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
