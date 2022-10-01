import { NestFactory } from '@nestjs/core';
import { LoanServiceModule } from './loan-service.module';

async function bootstrap() {
  const app = await NestFactory.create(LoanServiceModule);
  await app.listen(3000);
}
bootstrap();
