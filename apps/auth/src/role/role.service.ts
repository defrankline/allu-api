import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role';
import { CreateRoleRequest, UpdateRoleRequest } from './dto/role.request';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(request: CreateRoleRequest) {
    await this.validateCreateRoleRequest(request);
    const newItem = this.roleRepository.create(request);
    return this.roleRepository.save(newItem);
  }

  async update(id: number, updateRoleDto: UpdateRoleRequest) {
    await this.validateUpdateRoleRequest(updateRoleDto);
    const existingRole = await this.roleRepository.update(
      { id: id },
      updateRoleDto,
    );
    if (!existingRole) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return existingRole;
  }

  async findById(id: number) {
    return await this.roleRepository.findOneBy({ id: id });
  }

  private async validateCreateRoleRequest(request: CreateRoleRequest) {
    let row: Role;
    try {
      row = await this.roleRepository.findOneBy({
        name: request.name,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('UserRole already exists.');
    }
  }

  private async validateUpdateRoleRequest(request: UpdateRoleRequest) {
    let count = 1;
    try {
      count = await this.roleRepository.countBy({
        name: request.name,
      });
    } catch (err) {}
    if (count > 1) {
      throw new UnprocessableEntityException('UserRole already exists.');
    }
  }

  async getRole(getRoleArgs: Partial<Role>) {
    return this.roleRepository.findOneBy(getRoleArgs);
  }

  async getRoles(getRoleArgs: Partial<Role>) {
    return this.roleRepository.findBy(getRoleArgs);
  }

  async delete(id: number) {
    return this.roleRepository.delete({ id: id });
  }
}
