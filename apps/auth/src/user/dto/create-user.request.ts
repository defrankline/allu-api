import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from 'class-validator';
import { Company } from '../../company/company';
import { Role } from '../../role/role';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  company: Company;

  @IsNotEmpty()
  role: Role;
}
