import { NestFactory } from '@nestjs/core';
import { AssetServiceModule } from './asset-service.module';

async function bootstrap() {
  const app = await NestFactory.create(AssetServiceModule);
  await app.listen(3000);
}
bootstrap();
