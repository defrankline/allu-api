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
import { AccountSubTypeService } from '../services/account-sub-type.service';
import {
  CreateAccountSubTypeDto,
  UpdateAccountSubTypeDto,
} from '../entities/dto/accounting.dtos';
import { AccountSubType } from '../entities';
import { UpdateResult } from 'typeorm';

@Controller('api/v1/accounting/account-sub-types')
export class AccountSubTypeController {
  constructor(private readonly accountSubTypeService: AccountSubTypeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAccountSubTypeDto: CreateAccountSubTypeDto) {
    return this.accountSubTypeService.create(createAccountSubTypeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('keyword') keyword: string): Promise<Array<AccountSubType>> {
    return this.accountSubTypeService.findAll(keyword);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  getPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
  ): Promise<Pagination<AccountSubType>> {
    return this.accountSubTypeService.paginate({
      page: page,
      size: size,
      keyword: keyword,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountSubTypeService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountSubTypeDto: UpdateAccountSubTypeDto,
  ): Promise<UpdateResult> {
    return this.accountSubTypeService.update(id, updateAccountSubTypeDto);
  }
}
