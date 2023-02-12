import { Test, TestingModule } from '@nestjs/testing';
import { OperationTypeController } from './operation-type.controller';

describe('OperationTypeController', () => {
  let controller: OperationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperationTypeController],
    }).compile();

    controller = module.get<OperationTypeController>(OperationTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
