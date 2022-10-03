import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserRequest {
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
}
