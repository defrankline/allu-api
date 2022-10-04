import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, JwtAuthGuard } from '@app/common';
import { CreateAccountBalanceDto } from '../entities/dto/accounting.dtos';
import { CurrentUser } from '../../../auth/src/current-user.decorator';
import { User } from '../../../auth/src/user/user';
import { AccountBalanceService } from '../services';

@Controller('api/v1/accounting/account-balances')
export class AccountBalanceController {
  private readonly logger = new Logger(AccountBalanceController.name);

  constructor(private readonly accountService: AccountBalanceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createAccountBalanceDto: CreateAccountBalanceDto,
    @CurrentUser() user: User,
  ) {
    const companySet = !!createAccountBalanceDto.company;
    if (!companySet) {
      createAccountBalanceDto.company = user.company.id;
    }
    this.logger.log(
      user.company.name + ': Create Account Balance ',
      createAccountBalanceDto,
    );
    return this.accountService.create(createAccountBalanceDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('accountId') accountId: number): ApiResponse {
    return {
      data: this.accountService.findAll(accountId),
      message: 'Account Balances',
    } as ApiResponse;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findOne(id);
  }
}
