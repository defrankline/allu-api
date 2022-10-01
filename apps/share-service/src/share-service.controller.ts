import { Controller, Get } from '@nestjs/common';
import { ShareServiceService } from './share-service.service';

@Controller()
export class ShareServiceController {
  constructor(private readonly shareServiceService: ShareServiceService) {}

  @Get()
  getHello(): string {
    return this.shareServiceService.getHello();
  }
}
