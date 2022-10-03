import { Module } from '@nestjs/common';
import { AccountingServiceController } from './accounting-service.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, RmqModule } from '@app/common';
import { AccountingServiceService } from './accounting-service.service';
import { AccountTypeController } from './controllers/account-type.controller';
import { AccountTypeService } from './services/account-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountType } from './entities';
import { AccountSubType } from './entities/account-sub-type';
import { AccountGroup } from './entities/account-group';
import { Account } from './entities/account';
import { AccountSubTypeController } from './controllers/account-sub-type.controller';
import { AccountSubTypeService } from './services/account-sub-type.service';
import { AccountGroupService } from './services/account-group.service';
import { AccountGroupController } from './controllers/account-group.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/accounting/.env',
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
        entities: [AccountType, AccountSubType, AccountGroup, Account],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RmqModule,
    AuthModule,
    TypeOrmModule.forFeature([
      AccountType,
      AccountSubType,
      AccountGroup,
      Account,
    ]),
  ],
  controllers: [
    AccountingServiceController,
    AccountTypeController,
    AccountSubTypeController,
    AccountGroupController,
  ],
  providers: [
    AccountingServiceService,
    AccountTypeService,
    AccountSubTypeService,
    AccountGroupService,
  ],
})
export class AccountingServiceModule {}
