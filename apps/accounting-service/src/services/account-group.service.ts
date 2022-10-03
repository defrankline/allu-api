import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AccountGroup } from '../entities';
import {
  CreateAccountGroupDto,
  UpdateAccountGroupDto,
} from '../entities/dto/accounting.dtos';
import { Pagination, PaginationOptionsInterface } from '@app/common';

@Injectable()
export class AccountGroupService {
  constructor(
    @InjectRepository(AccountGroup)
    private readonly accountGroupRepository: Repository<AccountGroup>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<AccountGroup>> {
    const size = options.size || 10;
    const page = options.page || 0;
    const keyword = options.keyword || '';
    if (keyword && keyword !== '') {
      const [results, total] = await this.accountGroupRepository.findAndCount({
        where: { name: ILike('%' + keyword + '%') },
        order: { code: 'ASC' },
        take: size,
        skip: page,
      });
      return new Pagination<AccountGroup>({
        results,
        total,
      });
    } else {
      const [results, total] = await this.accountGroupRepository.findAndCount({
        order: { code: 'ASC' },
        take: size,
        skip: page,
      });
      return new Pagination<AccountGroup>({
        results,
        total,
      });
    }
  }

  async findAll(keyword: string): Promise<Array<AccountGroup>> {
    if (keyword && keyword !== '') {
      return await this.accountGroupRepository.find({
        where: { name: ILike('%' + keyword + '%') },
        order: { code: 'ASC' },
      });
    } else {
      return await this.accountGroupRepository.find({
        order: { code: 'ASC' },
      });
    }
  }

  async create(request: CreateAccountGroupDto): Promise<AccountGroup> {
    await this.validateCreateAccountGroupRequest(request);
    const newItem = this.accountGroupRepository.create(request);
    return this.accountGroupRepository.save(newItem);
  }

  async update(id: number, request: UpdateAccountGroupDto) {
    await this.validateUpdateAccountGroupRequest(request);
    const existingStudent = await this.accountGroupRepository.update(
      { id: id },
      request,
    );
    if (!existingStudent) {
      throw new NotFoundException(`Account Groups #${id} not found`);
    }
    return existingStudent;
  }

  async findById(id: number) {
    return this.accountGroupRepository.findOneBy({ id: id });
  }

  async delete(id: number) {
    return this.accountGroupRepository.delete({ id: id });
  }

  private async validateCreateAccountGroupRequest(
    request: CreateAccountGroupDto,
  ) {
    let row: AccountGroup;
    try {
      row = await this.accountGroupRepository.findOneBy({
        code: request.code,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Code already exists.');
    }
  }

  private async validateUpdateAccountGroupRequest(
    request: UpdateAccountGroupDto,
  ) {
    let count = 1;
    try {
      count = await this.accountGroupRepository.countBy({
        code: request.code,
      });
    } catch (err) {}

    if (count > 1) {
      throw new UnprocessableEntityException('Code already exists.');
    }
  }
}
