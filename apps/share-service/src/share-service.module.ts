import { Module } from '@nestjs/common';
import { ShareServiceController } from './share-service.controller';
import { ShareServiceService } from './share-service.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, RmqModule } from '@app/common';
import { ShareModule } from './share/share.module';
import { ShareTypeModule } from './share-type/share-type.module';
import shareEntities from './share-entities';
import { TRANSACTION_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/share-service/.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: shareEntities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(shareEntities),
    RmqModule.register({
      name: TRANSACTION_SERVICE,
    }),
    AuthModule,
    ShareModule,
    ShareTypeModule,
  ],
  controllers: [ShareServiceController],
  providers: [ShareServiceService],
})
export class ShareServiceModule {}
