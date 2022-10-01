import { Controller, Get } from '@nestjs/common';
import { ExpenditureServiceService } from './expenditure-service.service';

@Controller()
export class ExpenditureServiceController {
  constructor(private readonly expenditureServiceService: ExpenditureServiceService) {}

  @Get()
  getHello(): string {
    return this.expenditureServiceService.getHello();
  }
}
