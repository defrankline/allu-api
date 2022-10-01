import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
