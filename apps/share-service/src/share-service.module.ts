import { Module } from '@nestjs/common';
import { ShareServiceController } from './share-service.controller';
import { ShareServiceService } from './share-service.service';

@Module({
  imports: [],
  controllers: [ShareServiceController],
  providers: [ShareServiceService],
})
export class ShareServiceModule {}
