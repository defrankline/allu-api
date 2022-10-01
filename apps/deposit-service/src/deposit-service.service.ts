import { Injectable } from '@nestjs/common';

@Injectable()
export class DepositServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
