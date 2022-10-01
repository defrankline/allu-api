import { Controller, Get } from '@nestjs/common';
import { AssetServiceService } from './asset-service.service';

@Controller()
export class AssetServiceController {
  constructor(private readonly assetServiceService: AssetServiceService) {}

  @Get()
  getHello(): string {
    return this.assetServiceService.getHello();
  }
}
