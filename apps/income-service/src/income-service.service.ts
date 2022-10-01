import { Injectable } from '@nestjs/common';

@Injectable()
export class IncomeServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
