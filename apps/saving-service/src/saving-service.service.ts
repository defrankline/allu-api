import { Injectable } from '@nestjs/common';

@Injectable()
export class SavingServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
