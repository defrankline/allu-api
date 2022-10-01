import { NestFactory } from '@nestjs/core';
import { ExpenditureServiceModule } from './expenditure-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ExpenditureServiceModule);
  await app.listen(3000);
}
bootstrap();
