import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ShareType } from './share-type/share-type';

export class CreateShareTypeRequest {
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

export class UpdateShareTypeRequest {
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

export class CreateShareRequest {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

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

export class UpdateShareRequest {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

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
