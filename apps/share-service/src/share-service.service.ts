import { Injectable } from '@nestjs/common';

@Injectable()
export class ShareServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
