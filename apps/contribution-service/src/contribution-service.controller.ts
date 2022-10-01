import { Controller, Get } from '@nestjs/common';
import { ContributionServiceService } from './contribution-service.service';

@Controller()
export class ContributionServiceController {
  constructor(private readonly contributionServiceService: ContributionServiceService) {}

  @Get()
  getHello(): string {
    return this.contributionServiceService.getHello();
  }
}
