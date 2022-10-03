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
import { AccountTypeService } from '../services/account-type.service';
import {
  CreateAccountTypeDto,
  UpdateAccountTypeDto,
} from '../entities/dto/accounting.dtos';
import { AccountType } from '../entities';
import { UpdateResult } from 'typeorm';

@Controller('api/v1/accounting/account-types')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAccountTypeDto: CreateAccountTypeDto) {
    return this.accountTypeService.create(createAccountTypeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('keyword') keyword: string): Promise<Array<AccountType>> {
    return this.accountTypeService.findAll(keyword);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  getPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
  ): Promise<Pagination<AccountType>> {
    return this.accountTypeService.paginate({
      page: page,
      size: size,
      keyword: keyword,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountTypeService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountTypeDto: UpdateAccountTypeDto,
  ): Promise<UpdateResult> {
    return this.accountTypeService.update(id, updateAccountTypeDto);
  }
}
