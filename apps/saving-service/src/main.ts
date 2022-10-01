import { NestFactory } from '@nestjs/core';
import { SavingServiceModule } from './saving-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SavingServiceModule);
  await app.listen(3000);
}
bootstrap();
