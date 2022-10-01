import { Module } from '@nestjs/common';
import { ExpenditureServiceController } from './expenditure-service.controller';
import { ExpenditureServiceService } from './expenditure-service.service';

@Module({
  imports: [],
  controllers: [ExpenditureServiceController],
  providers: [ExpenditureServiceService],
})
export class ExpenditureServiceModule {}
