import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountingServiceService {
  ping(): string {
    return 'Hello Accounting!';
  }
}
