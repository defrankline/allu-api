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
import { AccountGroupService } from '../services/account-group.service';
import {
  CreateAccountGroupDto,
  UpdateAccountGroupDto,
} from '../entities/dto/accounting.dtos';
import { AccountGroup } from '../entities';
import { UpdateResult } from 'typeorm';

@Controller('api/v1/accounting/account-groups')
export class AccountGroupController {
  constructor(private readonly accountGroupService: AccountGroupService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAccountGroupDto: CreateAccountGroupDto) {
    return this.accountGroupService.create(createAccountGroupDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('keyword') keyword: string): Promise<Array<AccountGroup>> {
    return this.accountGroupService.findAll(keyword);
  }

  @Get('paginate')
  @UseGuards(JwtAuthGuard)
  getPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
  ): Promise<Pagination<AccountGroup>> {
    return this.accountGroupService.paginate({
      page: page,
      size: size,
      keyword: keyword,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountGroupService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAccountGroupDto: UpdateAccountGroupDto,
  ): Promise<UpdateResult> {
    return this.accountGroupService.update(id, updateAccountGroupDto);
  }
}
