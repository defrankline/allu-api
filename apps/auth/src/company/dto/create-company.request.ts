import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}
