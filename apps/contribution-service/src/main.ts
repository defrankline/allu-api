import { NestFactory } from '@nestjs/core';
import { ContributionServiceModule } from './contribution-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ContributionServiceModule);
  await app.listen(3007);
}
bootstrap();
