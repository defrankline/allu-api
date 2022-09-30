import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Company } from '../../company/schemas/company.schema';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  company: Company;
}
