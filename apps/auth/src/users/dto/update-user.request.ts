import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Company } from '../../company/schemas/company.schema';

export class UpdateUserRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  company: Company;
}
