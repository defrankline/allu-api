import { Module } from '@nestjs/common';
import { ContributionServiceController } from './contribution-service.controller';
import { ContributionServiceService } from './contribution-service.service';

@Module({
  imports: [],
  controllers: [ContributionServiceController],
  providers: [ContributionServiceService],
})
export class ContributionServiceModule {}
