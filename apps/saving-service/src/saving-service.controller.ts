import { Controller, Get } from '@nestjs/common';
import { SavingServiceService } from './saving-service.service';

@Controller()
export class SavingServiceController {
  constructor(private readonly savingServiceService: SavingServiceService) {}

  @Get()
  getHello(): string {
    return this.savingServiceService.getHello();
  }
}
