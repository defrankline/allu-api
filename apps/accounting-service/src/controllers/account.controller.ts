import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, Pagination } from '@app/common';
import { AccountService } from '../services/account.service';
import {
  CreateAccountDto,
  UpdateAccountDto,
} from '../entities/dto/accounting.dtos';
import { Account } from '../entities';
import { UpdateResult } from 'typeorm';
import { CurrentUser } from '../../../auth/src/current-user.decorator';
import { User } from '../../../auth/src/user/user';

@Controller('api/v1/accounting/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() user: User,
  ) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('keyword') keyword: string): Promise<Array<Account>> {
    return this.accountService.findAll(keyword);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  getPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
  ): Promise<Pagination<Account>> {
    return this.accountService.paginate({
      page: page,
      size: size,
      keyword: keyword,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return this.accountService.update(id, updateAccountDto);
  }
}
