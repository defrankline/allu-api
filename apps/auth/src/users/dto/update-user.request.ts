import { IsEmail } from 'class-validator';

export class UpdateUserRequest {
  @IsEmail()
  email: string;
}
