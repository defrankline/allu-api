import { NestFactory } from '@nestjs/core';
import { DepositServiceModule } from './deposit-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DepositServiceModule);
  await app.listen(3013);
}
bootstrap();
