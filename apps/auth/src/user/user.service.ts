import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from './dto/create-user.request';
import { UpdateUserRequest } from './dto/update-user.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(request: CreateUserRequest) {
    const payload = {
      ...request,
      password: await bcrypt.hash(request.password, 10),
    };
    await this.validateCreateUserEmailRequest(payload);
    await this.validateCreateUserNumberRequest(payload);
    const newItem = this.userRepository.create(payload);
    return this.userRepository.save(newItem);
  }

  async update(id: number, updateUserDto: UpdateUserRequest) {
    await this.validateUpdateUserEmailRequest(updateUserDto);
    await this.validateUpdateUserNumberRequest(updateUserDto);
    const existingUser = await this.userRepository.update(
      { id: id },
      updateUserDto,
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  private async validateCreateUserEmailRequest(request: CreateUserRequest) {
    let row: User;
    try {
      row = await this.userRepository.findOneBy({
        email: request.email,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  private async validateUpdateUserEmailRequest(request: UpdateUserRequest) {
    let count = 1;
    try {
      count = await this.userRepository.countBy({
        email: request.email,
      });
    } catch (err) {}
    if (count > 1) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  private async validateCreateUserNumberRequest(request: CreateUserRequest) {
    let row: User;
    try {
      row = await this.userRepository.findOneBy({
        number: request.number,
        company: request.company,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Number already exists.');
    }
  }

  private async validateUpdateUserNumberRequest(request: UpdateUserRequest) {
    let count = 1;
    try {
      count = await this.userRepository.countBy({
        number: request.number,
        company: request.company,
      });
    } catch (err) {}
    if (count > 1) {
      throw new UnprocessableEntityException('Number already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.userRepository.findOneBy(getUserArgs);
  }

  async getUsers(getUserArgs: Partial<User>) {
    return this.userRepository.findBy(getUserArgs);
  }

  async delete(id: number) {
    return this.userRepository.delete({ id: id });
  }
}
