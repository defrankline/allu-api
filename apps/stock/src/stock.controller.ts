import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './entities/dto/create-stock.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getStocks() {
    return this.stockService.findAll();
  }

  @Get(':id')
  findStocksById(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStocks(@Body() createStockDto: CreateStockDto, @Req() req: any) {
    return this.stockService.create(
      createStockDto,
      req.cookies?.Authentication,
    );
  }
}
