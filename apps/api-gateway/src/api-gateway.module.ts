import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'orders',
          port: 3000,
        },
      },
      {
        name: 'AUTH-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth',
          port: 3001,
        },
      },
      {
        name: 'STOCK-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'stock',
          port: 3002,
        },
      },
      {
        name: 'INVENTORY-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'inventory',
          port: 3003,
        },
      },
      {
        name: 'ACCOUNTING-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'accounting',
          port: 3004,
        },
      },
      {
        name: 'ASSET-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'asset',
          port: 3005,
        },
      },
      {
        name: 'BUDGET-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'budget',
          port: 3006,
        },
      },
      {
        name: 'CONTRIBUTION-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'contribution',
          port: 3007,
        },
      },
      {
        name: 'EXPENDITURE-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'expenditure',
          port: 3008,
        },
      },
      {
        name: 'INCOME-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'income',
          port: 3009,
        },
      },
      {
        name: 'LOAN-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'loan',
          port: 3010,
        },
      },
      {
        name: 'SAVING-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'saving',
          port: 3011,
        },
      },
      {
        name: 'SHARE-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'share',
          port: 3012,
        },
      },
      {
        name: 'DEPOSIT-SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'deposit',
          port: 3013,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
