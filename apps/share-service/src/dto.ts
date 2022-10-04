import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import Decimal from 'decimal.js';
import { ShareType } from './share-type/share-type';

export class ShareTypeRequest {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  mandatory: boolean;

  @IsNumber()
  @IsNotEmpty()
  company: number;

  @IsNumber()
  @IsNotEmpty()
  debitAccount: number;

  @IsNumber()
  @IsNotEmpty()
  creditAccount: number;
}

export class ShareRequest {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: Decimal;

  @IsNotEmpty()
  shareType: ShareType;

  @IsNotEmpty()
  @IsNumber()
  company: number;

  @IsNotEmpty()
  @IsNumber()
  member: number;

  @IsBoolean()
  approved: boolean;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  collectionAccount: number;

  @IsNotEmpty()
  @IsNumber()
  creditAccount: number;
}