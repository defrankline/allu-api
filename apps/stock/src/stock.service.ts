import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities';
import { CreateStockDto } from './entities/dto/create-stock.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { INVENTORY_SERVICE } from './constants/services';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @Inject(INVENTORY_SERVICE) private inventoryClient: ClientProxy,
  ) {}

  findAll() {
    return this.stockRepository.find({
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });
  }

  async create(createStockDto: CreateStockDto, authentication: string) {
    const newStock = this.stockRepository.create(createStockDto);
    const savedStock = this.stockRepository.save(newStock);
    await lastValueFrom(
      this.inventoryClient.emit('stock_created', {
        newStock,
        Authentication: authentication,
      }),
    );
    return savedStock;
  }

  findById(id: number) {
    return this.stockRepository.findOneBy({ id: id });
  }
}
