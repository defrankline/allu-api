import { Controller, Get } from '@nestjs/common';
import { AccountingServiceService } from './accounting-service.service';

@Controller('api/v1/accounting')
export class AccountingServiceController {
  constructor(
    private readonly accountingServiceService: AccountingServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.accountingServiceService.ping();
  }
}
