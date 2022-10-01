import { Test, TestingModule } from '@nestjs/testing';
import { IncomeServiceController } from './income-service.controller';
import { IncomeServiceService } from './income-service.service';

describe('IncomeServiceController', () => {
  let incomeServiceController: IncomeServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IncomeServiceController],
      providers: [IncomeServiceService],
    }).compile();

    incomeServiceController = app.get<IncomeServiceController>(IncomeServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(incomeServiceController.getHello()).toBe('Hello World!');
    });
  });
});
