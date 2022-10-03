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
import { CreateUserRequest } from './dto/create-user.request';
import { UserService } from './user.service';
import { UpdateUserRequest } from './dto/update-user.request';

@Controller('auth/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return this.userService.getUsers({});
  }

  @Post()
  async create(@Body() request: CreateUserRequest) {
    return this.userService.create(request);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateUserRequest,
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
