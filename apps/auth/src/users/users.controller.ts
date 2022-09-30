import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { UpdateUserRequest } from './dto/update-user.request';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.getUsers({});
  }

  @Post()
  async create(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() request: UpdateUserRequest) {
    return this.usersService.updateUser(id, request);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Body() request: UpdateUserRequest) {
    return this.usersService.updateUser(id, request);
  }
}
