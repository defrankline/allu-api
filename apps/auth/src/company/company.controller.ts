import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyRequest, UpdateCompanyRequest } from './dto';

@Controller('auth/company')
export class CompanyController {
  constructor(private readonly userService: CompanyService) {}

  @Get()
  async getAll() {
    return this.userService.getCompanies({});
  }

  @Post()
  async create(@Body() request: CreateCompanyRequest) {
    return this.userService.create(request);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateCompanyRequest,
  ) {
    return this.userService.update(id, request);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
