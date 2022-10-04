import { Module } from '@nestjs/common';
import { AccountingServiceController } from './accounting-service.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, RmqModule } from '@app/common';
import { AccountingServiceService } from './accounting-service.service';
import { AccountTypeController } from './controllers/account-type.controller';
import { AccountTypeService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountSubTypeController } from './controllers/account-sub-type.controller';
import { AccountSubTypeService } from './services';
import { AccountGroupService } from './services';
import { AccountGroupController } from './controllers/account-group.controller';
import { AccountService } from './services';
import { AccountController } from './controllers/account.controller';
import { AccountBalanceController } from './controllers/account-balance.controller';
import { AccountBalanceService } from './services';
import accountingEntities from './entities';
import { TransactionService } from './services/transaction.service';
import { DoubleEntrySystemService } from './services/double-entry-system.service';
import { TransactionItemService } from './services/transaction-item.service';

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
        entities: accountingEntities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RmqModule,
    AuthModule,
    TypeOrmModule.forFeature(accountingEntities),
  ],
  controllers: [
    AccountingServiceController,
    AccountTypeController,
    AccountSubTypeController,
    AccountGroupController,
    AccountController,
    AccountBalanceController,
  ],
  providers: [
    AccountingServiceService,
    AccountTypeService,
    AccountSubTypeService,
    AccountGroupService,
    AccountService,
    AccountBalanceService,
    TransactionService,
    DoubleEntrySystemService,
    TransactionItemService,
  ],
})
export class AccountingServiceModule {}
