import { Test, TestingModule } from '@nestjs/testing';
import { SavingServiceController } from './saving-service.controller';
import { SavingServiceService } from './saving-service.service';

describe('SavingServiceController', () => {
  let savingServiceController: SavingServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SavingServiceController],
      providers: [SavingServiceService],
    }).compile();

    savingServiceController = app.get<SavingServiceController>(SavingServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(savingServiceController.getHello()).toBe('Hello World!');
    });
  });
});
