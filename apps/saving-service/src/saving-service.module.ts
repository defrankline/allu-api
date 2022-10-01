import { Module } from '@nestjs/common';
import { SavingServiceController } from './saving-service.controller';
import { SavingServiceService } from './saving-service.service';

@Module({
  imports: [],
  controllers: [SavingServiceController],
  providers: [SavingServiceService],
})
export class SavingServiceModule {}
