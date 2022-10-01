import { NestFactory } from '@nestjs/core';
import { ShareServiceModule } from './share-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ShareServiceModule);
  await app.listen(3012);
}
bootstrap();
