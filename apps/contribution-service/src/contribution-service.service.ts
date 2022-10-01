import { Injectable } from '@nestjs/common';

@Injectable()
export class ContributionServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
