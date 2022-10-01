import { Controller, Get } from '@nestjs/common';
import { IncomeServiceService } from './income-service.service';

@Controller()
export class IncomeServiceController {
  constructor(private readonly incomeServiceService: IncomeServiceService) {}

  @Get()
  getHello(): string {
    return this.incomeServiceService.getHello();
  }
}
