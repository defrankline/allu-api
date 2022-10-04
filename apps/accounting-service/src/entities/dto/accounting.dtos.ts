import {
  IsBoolean,
  isBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { BalanceNature } from '../balance-nature';
import { AccountType } from '../account-type';
import { AccountSubType } from '../account-sub-type';
import { AccountGroup } from '../account-group';
import { Transaction } from '../transaction';
import { Account } from '../account';
import Decimal from 'decimal.js';
import { TransactionItem } from '../transaction-item';
import { Batch } from '../batch';
import { TransactionType } from '../transaction-type';

export class CreateAccountTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  balanceNature: BalanceNature;
}

export class UpdateAccountTypeDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  balanceNature: BalanceNature;
}

export class CreateAccountSubTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  accountType: AccountType;
}

export class UpdateAccountSubTypeDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  accountType: AccountType;
}

export class CreateAccountGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  balanceNature: BalanceNature;
}

export class UpdateAccountGroupDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  balanceNature: BalanceNature;

  @IsNotEmpty()
  accountSubType: AccountSubType;
}

export class CreateAccountDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  number: string;

  @IsNumber()
  company: number;

  @IsNotEmpty()
  accountGroup: AccountGroup;
}

export class UpdateAccountDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  number: string;

  @IsNumber()
  company: number;

  @IsNotEmpty()
  accountGroup: AccountGroup;
}

export class CreateAccountBalanceDto {
  @IsNumber()
  company: number;

  @IsNotEmpty()
  transaction: Transaction;

  @IsNotEmpty()
  account: Account;

  @IsDate()
  date: Date;

  @IsNumber()
  balance: Decimal;

  @IsNumber()
  financialYear: number;

  @IsNumber()
  audited: boolean;
}

export class UpdateAccountBalanceDto {
  @IsNotEmpty()
  id: number;

  @IsNumber()
  company: number;

  @IsNotEmpty()
  transaction: Transaction;

  @IsNotEmpty()
  account: Account;

  @IsDate()
  date: Date;

  @IsNumber()
  balance: Decimal;

  @IsNumber()
  financialYear: number;

  @IsNumber()
  audited: boolean;
}

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  amount: Decimal;

  @IsNotEmpty()
  batch: Batch;

  @IsNotEmpty()
  company: number;

  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsString()
  chequeNumber: string;

  @IsString()
  @IsNotEmpty()
  narration: string;

  @IsString()
  payee: string;

  @IsNumber()
  teller: number;
}

export class TransactionDto {
  @IsNumber()
  @IsPositive()
  amount: Decimal;

  @IsNotEmpty()
  batch: Batch;

  @IsNotEmpty()
  company: number;

  @IsDate()
  date: Date;

  @IsString()
  number: string;

  @IsString()
  chequeNumber: string;

  @IsBoolean()
  audited: boolean;

  @IsString()
  @IsNotEmpty()
  narration: string;

  @IsString()
  payee: string;

  @IsNotEmpty()
  items: CreateTransactionItemDto[];

  @IsNumber()
  teller: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transactionType: TransactionType;
}

export class CreateTransactionItemDto {
  @IsNumber()
  @IsPositive()
  amount: Decimal;

  @IsNotEmpty()
  transaction: Transaction;

  @IsNotEmpty()
  account: Account;

  @IsEnum(BalanceNature)
  balanceNature: BalanceNature;

  @IsNumber()
  @IsPositive()
  company: number;
}
