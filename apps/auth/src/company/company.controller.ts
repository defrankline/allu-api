import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyRequest } from './dto/company.request';

@Controller('auth/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() request: CompanyRequest) {
    return this.companyService.create(request);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() request: CompanyRequest) {
    return this.companyService.update(id, request);
  }
}
