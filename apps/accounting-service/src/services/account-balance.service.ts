import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AccountBalance } from '../entities';
import {
  CreateAccountBalanceDto,
  UpdateAccountBalanceDto,
} from '../entities/dto/accounting.dtos';

@Injectable()
export class AccountBalanceService {
  constructor(
    @InjectRepository(AccountBalance)
    private repository: Repository<AccountBalance>,
    @InjectEntityManager() private accountBalanceManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  create(createAccountBalanceDto: CreateAccountBalanceDto) {
    const newAccountBalance = this.repository.create(createAccountBalanceDto);
    return this.repository.save(newAccountBalance);
  }

  async findAll(accountId = 0) {
    await this.dataSource
      .createQueryBuilder(AccountBalance, 'accountBalance')
      .where('accountBalance.account.id= :accountId', { accountId: accountId })
      .getMany();
    return this.repository.find();
  }

  async findAllPaginate(page: number, size: number, accountId = 0) {
    if (accountId == 0) {
      await this.dataSource
        .createQueryBuilder(AccountBalance, 'accountBalance')
        .take(size)
        .skip(page)
        .getMany();
      return this.repository.find();
    } else {
      await this.dataSource
        .createQueryBuilder(AccountBalance, 'accountBalance')
        .where('accountBalance.account.id= :accountId', {
          accountId: accountId,
        })
        .take(size)
        .skip(page)
        .getMany();
      return this.repository.find();
    }
  }

  async findOne(id: number) {
    const accountBalanceWithRepository = await this.repository.findOneBy({
      id,
    });

    const accountBalanceWithQueryBuilder = await this.repository
      .createQueryBuilder('accountBalance')
      .where('accountBalance.id= :accountBalanceId', { accountBalanceId: id })
      .getOne();

    const accountBalanceFromEntityManager = await this.accountBalanceManager
      .createQueryBuilder(AccountBalance, 'accountBalance')
      .where('accountBalance.id= :accountBalanceId', { accountBalanceId: id })
      .getOne();

    const accountBalanceFromDataSource = await this.dataSource
      .createQueryBuilder()
      .select('accountBalance')
      .from(AccountBalance, 'accountBalance')
      .where('accountBalance.id= :accountBalanceId', { accountBalanceId: id })
      .getOne();

    return {
      accountBalanceWithRepository,
      accountBalanceWithQueryBuilder,
      accountBalanceFromEntityManager,
      accountBalanceFromDataSource,
    };
  }

  async update(id: number, updateAccountBalanceDto: UpdateAccountBalanceDto) {
    const accountBalance = await this.repository.findOneBy({ id });
    accountBalance.balance = updateAccountBalanceDto.balance;
    return this.repository.save(accountBalance);
  }

  async remove(id: number) {
    const accountBalance = await this.repository.findOneBy({ id });
    return this.repository.remove(accountBalance);
  }
}
