import { Module } from '@nestjs/common';
import { IncomeServiceController } from './income-service.controller';
import { IncomeServiceService } from './income-service.service';

@Module({
  imports: [],
  controllers: [IncomeServiceController],
  providers: [IncomeServiceService],
})
export class IncomeServiceModule {}
