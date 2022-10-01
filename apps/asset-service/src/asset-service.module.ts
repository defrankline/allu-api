import { Module } from '@nestjs/common';
import { AssetServiceController } from './asset-service.controller';
import { AssetServiceService } from './asset-service.service';

@Module({
  imports: [],
  controllers: [AssetServiceController],
  providers: [AssetServiceService],
})
export class AssetServiceModule {}
