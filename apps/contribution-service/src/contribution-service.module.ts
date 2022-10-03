import { Module } from '@nestjs/common';
import { ContributionServiceController } from './contribution-service.controller';
import { ContributionServiceService } from './contribution-service.service';
import { AccountGroupModule } from './account-group/account-group.module';

@Module({
  imports: [AccountGroupModule],
  controllers: [ContributionServiceController],
  providers: [ContributionServiceService],
})
export class ContributionServiceModule {}
