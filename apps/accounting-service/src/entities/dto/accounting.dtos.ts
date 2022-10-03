import { IsNotEmpty, IsNumber } from 'class-validator';
import { BalanceNature } from '../balance-nature';
import { AccountType } from '../account-type';
import { AccountSubType } from '../account-sub-type';
import { AccountGroup } from '../account-group';

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
