import { Controller, Get } from '@nestjs/common';
import { DepositServiceService } from './deposit-service.service';

@Controller()
export class DepositServiceController {
  constructor(private readonly depositServiceService: DepositServiceService) {}

  @Get()
  getHello(): string {
    return this.depositServiceService.getHello();
  }
}
