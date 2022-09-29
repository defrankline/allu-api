import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  refilling(data: any) {
    this.logger.log('Inventory Refilling...', data);
  }
}
