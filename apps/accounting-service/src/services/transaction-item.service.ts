import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionItem } from '../entities';
import { CreateTransactionItemDto } from '../entities/dto/accounting.dtos';

@Injectable()
export class TransactionItemService {
  constructor(
    @InjectRepository(TransactionItem)
    private repository: Repository<TransactionItem>,
  ) {}

  create(createTransactionItemDto: CreateTransactionItemDto) {
    const newTransaction = this.repository.create(createTransactionItemDto);
    return this.repository.save(newTransaction);
  }
}
