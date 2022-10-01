import { Module } from '@nestjs/common';
import { DepositServiceController } from './deposit-service.controller';
import { DepositServiceService } from './deposit-service.service';

@Module({
  imports: [],
  controllers: [DepositServiceController],
  providers: [DepositServiceService],
})
export class DepositServiceModule {}
