import { Test, TestingModule } from '@nestjs/testing';
import { ExpenditureServiceController } from './expenditure-service.controller';
import { ExpenditureServiceService } from './expenditure-service.service';

describe('ExpenditureServiceController', () => {
  let expenditureServiceController: ExpenditureServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExpenditureServiceController],
      providers: [ExpenditureServiceService],
    }).compile();

    expenditureServiceController = app.get<ExpenditureServiceController>(ExpenditureServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(expenditureServiceController.getHello()).toBe('Hello World!');
    });
  });
});
