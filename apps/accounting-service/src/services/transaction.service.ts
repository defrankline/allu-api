import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities';
import { CreateTransactionDto } from '../entities/dto/accounting.dtos';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repository: Repository<Transaction>,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    const newTransaction = this.repository.create(createTransactionDto);
    return this.repository.save(newTransaction);
  }
}
