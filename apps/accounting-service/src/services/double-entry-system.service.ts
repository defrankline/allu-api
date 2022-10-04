import { Injectable } from '@nestjs/common';
import { Account, AccountBalance, Batch, TransactionItem } from '../entities';
import { BalanceNature } from '../entities/balance-nature';
import {
  CreateAccountBalanceDto,
  CreateTransactionDto,
  CreateTransactionItemDto,
  TransactionDto,
} from '../entities/dto/accounting.dtos';
import { AccountBalanceService } from './account-balance.service';
import { AccountService } from './account.service';
import { TransactionService } from './transaction.service';
import { TransactionItemService } from './transaction-item.service';
import Decimal from 'decimal.js';
import { randomUUID } from 'crypto';
import { TransactionType } from '../entities/transaction-type';

@Injectable()
export class DoubleEntrySystemService {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountBalanceService: AccountBalanceService,
    private readonly transactionService: TransactionService,
    private readonly transactionItemService: TransactionItemService,
  ) {}

  private async debitProcess(transactionItem: TransactionItem): Promise<void> {
    const account = await this.accountService.findOne(
      transactionItem.account.id,
    );
    const currentBalance = account.balance;
    if (transactionItem.balanceNature == BalanceNature.DEBIT) {
      account.balance = currentBalance.add(transactionItem.amount);
      await this.accountService.update(transactionItem.account.id, account);
    } else {
      account.balance = currentBalance.sub(transactionItem.amount);
      await this.accountService.update(transactionItem.account.id, account);
    }
  }

  private async creditProcess(transactionItem: TransactionItem): Promise<void> {
    const account = await this.accountService.findOne(
      transactionItem.account.id,
    );
    const currentBalance = account.balance;
    if (transactionItem.balanceNature == BalanceNature.CREDIT) {
      account.balance = currentBalance.add(transactionItem.amount);
      await this.accountService.update(transactionItem.account.id, account);
    } else {
      account.balance = currentBalance.sub(transactionItem.amount);
      await this.accountService.update(transactionItem.account.id, account);
    }
  }

  private async createAccountBalance(
    transactionItem: TransactionItem,
    financialYear: number,
    company: number,
    audited: boolean,
  ): Promise<AccountBalance> {
    const createBalance = {
      account: { id: transactionItem.account.id },
      balance: transactionItem.account.balance,
      company: company,
      financialYear: financialYear,
      audited: audited,
      date: transactionItem.transaction.date,
      transaction: transactionItem.transaction,
    } as CreateAccountBalanceDto;
    return this.accountBalanceService.create(createBalance);
  }

  private async complete(
    transactionItems: Array<TransactionItem>,
    financialYear: number,
    company: number,
    audited: boolean,
  ) {
    transactionItems.map((debitAccountItem) => {
      if (debitAccountItem.balanceNature === BalanceNature.DEBIT) {
        const payload = {
          account: debitAccountItem.account,
          amount: debitAccountItem.amount,
          company: company,
          balanceNature: BalanceNature.DEBIT,
          transaction: debitAccountItem.transaction,
        } as CreateTransactionItemDto;
        this.transactionItemService.create(payload);

        this.updateAccountBalance(
          debitAccountItem,
          financialYear,
          company,
          audited,
        );
      }
    });
    transactionItems.map((debitAccountItem) => {
      if (debitAccountItem.balanceNature === BalanceNature.CREDIT) {
        const payload = {
          account: debitAccountItem.account,
          amount: debitAccountItem.amount,
          company: company,
          balanceNature: BalanceNature.CREDIT,
          transaction: debitAccountItem.transaction,
        } as CreateTransactionItemDto;
        this.transactionItemService.create(payload);

        this.updateAccountBalance(
          debitAccountItem,
          financialYear,
          company,
          audited,
        );
      }
    });
  }

  private async updateAccountBalance(
    transactionItem: TransactionItem,
    financialYear: number,
    company: number,
    audited: boolean,
  ) {
    let accountTypeBalanceNatureDr = BalanceNature.DEBIT;
    this.getAccountTypeBalanceNature(transactionItem.account.id).then((row) => {
      accountTypeBalanceNatureDr = row;
    });
    let accountGroupBalanceNatureDr = BalanceNature.DEBIT;
    this.getAccountGroupBalanceNature(transactionItem.account.id).then(
      (row) => {
        accountGroupBalanceNatureDr = row;
      },
    );

    if (accountTypeBalanceNatureDr === BalanceNature.DEBIT) {
      if (accountGroupBalanceNatureDr === BalanceNature.DEBIT) {
        await this.debitProcess(transactionItem);
        await this.createAccountBalance(
          transactionItem,
          financialYear,
          company,
          audited,
        );
      } else {
        await this.creditProcess(transactionItem);
        await this.createAccountBalance(
          transactionItem,
          financialYear,
          company,
          audited,
        );
      }
    }
    let accountTypeBalanceNatureCr = BalanceNature.CREDIT;
    this.getAccountTypeBalanceNature(transactionItem.account.id).then((row) => {
      accountTypeBalanceNatureCr = row;
    });
    let accountGroupBalanceNatureCr = BalanceNature.CREDIT;
    this.getAccountGroupBalanceNature(transactionItem.account.id).then(
      (row) => {
        accountGroupBalanceNatureCr = row;
      },
    );
    if (accountTypeBalanceNatureCr === BalanceNature.CREDIT) {
      if (accountGroupBalanceNatureCr === BalanceNature.CREDIT) {
        await this.creditProcess(transactionItem);
        await this.createAccountBalance(
          transactionItem,
          financialYear,
          company,
          audited,
        );
      } else {
        await this.debitProcess(transactionItem);
        await this.createAccountBalance(
          transactionItem,
          financialYear,
          company,
          audited,
        );
      }
    }
  }

  public async getAccountTypeBalanceNature(
    accountId: number,
  ): Promise<BalanceNature> {
    const account = await this.accountService.findOne(accountId);
    return account.accountGroup.accountSubType.accountType.balanceNature;
  }

  public async getAccountGroupBalanceNature(
    accountId: number,
  ): Promise<BalanceNature> {
    const account = await this.accountService.findOne(accountId);
    return account.accountGroup.balanceNature;
  }

  public async fundEnough(
    transactionItems: CreateTransactionItemDto[],
  ): Promise<boolean> {
    let issues = 0;
    transactionItems.map(async (transactionItem) => {
      if (transactionItem.account !== null) {
        const accountId = transactionItem.account.id;
        const amount = transactionItem.amount;
        const balanceNature = transactionItem.balanceNature;
        const a = await this.accountBalanceIssues(
          accountId,
          amount,
          balanceNature,
        );
        if (a > 0) {
          issues = issues + 1;
        }
      } else {
        issues = issues + 1;
      }
    });
    return issues == 0;
  }

  public async accountBalanceIssues(
    accountId: number,
    amount: Decimal,
    balanceNature: BalanceNature,
  ): Promise<number> {
    let errorCount = 0;
    let accountTypeBalanceNatureDr = BalanceNature.DEBIT;
    this.getAccountTypeBalanceNature(accountId).then((row) => {
      accountTypeBalanceNatureDr = row;
    });
    let accountGroupBalanceNatureDr = BalanceNature.DEBIT;
    this.getAccountGroupBalanceNature(accountId).then((row) => {
      accountGroupBalanceNatureDr = row;
    });

    if (accountTypeBalanceNatureDr === BalanceNature.DEBIT) {
      if (accountGroupBalanceNatureDr == BalanceNature.DEBIT) {
        if (balanceNature == BalanceNature.CREDIT) {
          const account = await this.accountService.findOne(accountId);
          const currentBalance = account.balance;
          if (currentBalance < amount) {
            errorCount = errorCount + 1;
          }
        }
      } else {
        if (balanceNature == BalanceNature.DEBIT) {
          const account = await this.accountService.findOne(accountId);
          const currentBalance = account.balance;
          if (currentBalance < amount) {
            errorCount = errorCount + 1;
          }
        }
      }
    }

    let accountTypeBalanceNatureCr = BalanceNature.CREDIT;
    this.getAccountTypeBalanceNature(accountId).then((row) => {
      accountTypeBalanceNatureCr = row;
    });
    let accountGroupBalanceNatureCr = BalanceNature.CREDIT;
    this.getAccountGroupBalanceNature(accountId).then((row) => {
      accountGroupBalanceNatureCr = row;
    });

    if (accountTypeBalanceNatureCr == BalanceNature.CREDIT) {
      if (accountGroupBalanceNatureCr == BalanceNature.CREDIT) {
        if (balanceNature == BalanceNature.DEBIT) {
          const account = await this.accountService.findOne(accountId);
          const currentBalance = account.balance;
          if (currentBalance < amount) {
            errorCount = errorCount + 1;
          }
        }
      } else {
        if (balanceNature == BalanceNature.CREDIT) {
          const account = await this.accountService.findOne(accountId);
          const currentBalance = account.balance;
          if (currentBalance < amount) {
            errorCount = errorCount + 1;
          }
        }
      }
    }
    return errorCount;
  }

  private totalDebitCalc(items: CreateTransactionItemDto[]): Decimal {
    let total = new Decimal(0.0);
    items.map((row) => {
      if (row.balanceNature === BalanceNature.DEBIT) {
        total = total.add(row.amount);
      }
    });
    return total;
  }

  private totalCreditCalc(items: CreateTransactionItemDto[]): Decimal {
    let total = new Decimal(0.0);
    items.map((row) => {
      if (row.balanceNature === BalanceNature.CREDIT) {
        total = total.add(row.amount);
      }
    });
    return total;
  }

  public async transact(
    teller: number,
    transactionDto: TransactionDto,
    financialYear: number,
    company: number,
  ) {
    const totalDebit = this.totalDebitCalc(transactionDto.items);
    const totalCredit = this.totalCreditCalc(transactionDto.items);
    if (totalDebit.comparedTo(0.0) > 0 && totalDebit === totalCredit) {
      const referenceNumber = transactionDto.number;
      if (transactionDto.number) {
        transactionDto.number = randomUUID().toString();
      }
      if (transactionDto.chequeNumber == null) {
        transactionDto.chequeNumber = transactionDto.number;
      }

      const createTransaction = {
        number: referenceNumber,
        amount: new Decimal(totalDebit),
        company: company,
        date: transactionDto.date,
        batch: transactionDto.batch,
        payee: transactionDto.payee,
        chequeNumber: transactionDto.chequeNumber,
        narration: transactionDto.narration,
        teller: teller,
      } as CreateTransactionDto;
      const newTransaction = await this.transactionService.create(
        createTransaction,
      );

      const items: TransactionItem[] = [];
      transactionDto.items.map((item) => {
        const row = {
          transaction: newTransaction,
          balanceNature: item.balanceNature,
          amount: new Decimal(item.amount),
          company: company,
          account: item.account,
        } as TransactionItem;
        items.push(row);
      });

      await this.complete(
        items,
        financialYear,
        company,
        transactionDto.audited,
      );
      return newTransaction;
    } else {
      return null;
    }
  }

  private async simpleDoubleEntry(
    debitAccount: Account,
    creditAccount: Account,
    amount: Decimal,
    company: number,
    financialYear: number,
    teller: number,
    date: Date,
    referenceNumber: string,
    narration: string,
    type: TransactionType,
    chequeNumber: string,
    payee: string,
    batch: Batch,
    audited: boolean,
  ) {
    const debitItem = {
      account: debitAccount,
      balanceNature: BalanceNature.DEBIT,
      company: company,
      amount: amount,
    } as CreateTransactionItemDto;

    const creditItem = {
      account: creditAccount,
      balanceNature: BalanceNature.CREDIT,
      company: company,
      amount: amount,
    } as CreateTransactionItemDto;

    const transactionItems: CreateTransactionItemDto[] = [];
    transactionItems.push(debitItem);
    transactionItems.push(creditItem);

    const transactionDto = {
      narration: narration,
      transactionType: type,
      number: referenceNumber,
      amount: amount,
      chequeNumber: chequeNumber,
      payee: payee,
      items: transactionItems,
      date: date,
      batch: batch,
      teller: teller,
      audited: audited,
      company: company,
    } as TransactionDto;

    const fund = await this.fundEnough(transactionItems);
    if (fund) {
      await this.transact(teller, transactionDto, financialYear, company);
    }
  }
}
