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

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    return await this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
  }

  async updateUser(
    id: string,
    updateStudentDto: CreateUserRequest,
  ): Promise<User> {
    const existingStudent = await this.usersRepository.findOneAndUpdate(
      { id: id },
      updateStudentDto,
    );
    if (!existingStudent) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingStudent;
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ id: id });
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        email: request.email,
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }
}
