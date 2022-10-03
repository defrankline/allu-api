import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRoleRequest {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
