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
import { RoleService } from './role.service';
import { CreateRoleRequest, UpdateRoleRequest } from './dto/role.request';

@Controller('auth/role')
export class RoleController {
  constructor(private readonly userService: RoleService) {}

  @Get()
  async getAll() {
    return this.userService.getRoles({});
  }

  @Post()
  async create(@Body() request: CreateRoleRequest) {
    return this.userService.create(request);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateRoleRequest,
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
