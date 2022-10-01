import { Test, TestingModule } from '@nestjs/testing';
import { ContributionServiceController } from './contribution-service.controller';
import { ContributionServiceService } from './contribution-service.service';

describe('ContributionServiceController', () => {
  let contributionServiceController: ContributionServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContributionServiceController],
      providers: [ContributionServiceService],
    }).compile();

    contributionServiceController = app.get<ContributionServiceController>(ContributionServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(contributionServiceController.getHello()).toBe('Hello World!');
    });
  });
});
