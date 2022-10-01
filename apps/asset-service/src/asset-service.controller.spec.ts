import { Test, TestingModule } from '@nestjs/testing';
import { AssetServiceController } from './asset-service.controller';
import { AssetServiceService } from './asset-service.service';

describe('AssetServiceController', () => {
  let assetServiceController: AssetServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AssetServiceController],
      providers: [AssetServiceService],
    }).compile();

    assetServiceController = app.get<AssetServiceController>(AssetServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(assetServiceController.getHello()).toBe('Hello World!');
    });
  });
});
