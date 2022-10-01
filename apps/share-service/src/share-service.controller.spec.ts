import { Test, TestingModule } from '@nestjs/testing';
import { ShareServiceController } from './share-service.controller';
import { ShareServiceService } from './share-service.service';

describe('ShareServiceController', () => {
  let shareServiceController: ShareServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShareServiceController],
      providers: [ShareServiceService],
    }).compile();

    shareServiceController = app.get<ShareServiceController>(ShareServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shareServiceController.getHello()).toBe('Hello World!');
    });
  });
});
