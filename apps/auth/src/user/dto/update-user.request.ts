import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Company } from '../../company/company';
import { Role } from '../../role/role';

export class UpdateUserRequest {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  company: Company;

  @IsNotEmpty()
  role: Role;
}
