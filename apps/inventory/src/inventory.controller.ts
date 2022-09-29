import { Controller, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard, RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('stock_created')
  @UseGuards(JwtAuthGuard)
  async handleInventoryCreated(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    this.inventoryService.refilling(data);
    this.rmqService.ack(context);
  }
}
