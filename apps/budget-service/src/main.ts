import { NestFactory } from '@nestjs/core';
import { BudgetServiceModule } from './budget-service.module';

async function bootstrap() {
  const app = await NestFactory.create(BudgetServiceModule);
  await app.listen(3006);
}
bootstrap();
