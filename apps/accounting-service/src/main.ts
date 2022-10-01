import { NestFactory } from '@nestjs/core';
import { AccountingServiceModule } from './accounting-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AccountingServiceModule);
  await app.listen(3000);
}
bootstrap();
