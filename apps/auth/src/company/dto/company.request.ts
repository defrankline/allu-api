import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}
