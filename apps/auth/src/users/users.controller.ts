import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';

@Controller('auth/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return this.usersService.createUser(request);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() request: CreateUserRequest,
  ) {
    return this.usersService.updateUser(id, request);
  }
}
