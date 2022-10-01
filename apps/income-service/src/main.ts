import { NestFactory } from '@nestjs/core';
import { IncomeServiceModule } from './income-service.module';

async function bootstrap() {
  const app = await NestFactory.create(IncomeServiceModule);
  await app.listen(3000);
}
bootstrap();
