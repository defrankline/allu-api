import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { CreateUserRequest } from './dto/create-user.request';
import { User } from './schemas/user.schema';
import { UpdateUserRequest } from './dto/update-user.request';
import { CompanyRequest } from '../company/dto/company.request';
import { Company } from '../company/schemas/company.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    return await this.userRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserRequest,
  ): Promise<User> {
    await this.validateUpdateCompanyRequest(id, updateUserDto);
    const existingUser = await this.userRepository.findOneAndUpdate(
      { id: id },
      updateUserDto,
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ id: id });
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  private async validateUpdateCompanyRequest(
    id: string,
    request: UpdateUserRequest,
  ) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      const foundId = user._id.toString();
      if (foundId !== id) {
        throw new UnprocessableEntityException('Email already exists.');
      }
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.userRepository.findOne(getUserArgs);
  }

  async getUsers(getUserArgs: Partial<User>) {
    return this.userRepository.find(getUserArgs);
  }
}
