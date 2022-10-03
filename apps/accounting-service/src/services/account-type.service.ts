import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AccountType } from '../entities';
import {
  CreateAccountTypeDto,
  UpdateAccountTypeDto,
} from '../entities/dto/accounting.dtos';
import { Pagination, PaginationOptionsInterface } from '@app/common';

@Injectable()
export class AccountTypeService {
  constructor(
    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<AccountType>> {
    const size = options.size || 10;
    const page = options.page || 0;
    const keyword = options.keyword || '';
    if (keyword && keyword !== '') {
      const [results, total] = await this.accountTypeRepository.findAndCount({
        where: { name: ILike('%' + keyword + '%') },
        order: { code: 'ASC' },
        take: size,
        skip: page,
      });
      return new Pagination<AccountType>({
        results,
        total,
      });
    } else {
      const [results, total] = await this.accountTypeRepository.findAndCount({
        order: { code: 'ASC' },
        take: size,
        skip: page,
      });
      return new Pagination<AccountType>({
        results,
        total,
      });
    }
  }

  async findAll(keyword: string): Promise<Array<AccountType>> {
    if (keyword && keyword !== '') {
      return await this.accountTypeRepository.find({
        where: { name: ILike('%' + keyword + '%') },
        order: { code: 'ASC' },
      });
    } else {
      return await this.accountTypeRepository.find({
        order: { code: 'ASC' },
      });
    }
  }

  async create(request: CreateAccountTypeDto): Promise<AccountType> {
    await this.validateCreateAccountTypeRequest(request);
    const newItem = this.accountTypeRepository.create(request);
    return this.accountTypeRepository.save(newItem);
  }

  async update(id: number, request: UpdateAccountTypeDto) {
    await this.validateUpdateAccountTypeRequest(request);
    const existingStudent = await this.accountTypeRepository.update(
      { id: id },
      request,
    );
    if (!existingStudent) {
      throw new NotFoundException(`Account Types #${id} not found`);
    }
    return existingStudent;
  }

  async findById(id: number) {
    return this.accountTypeRepository.findOneBy({ id: id });
  }

  async delete(id: number) {
    return this.accountTypeRepository.delete({ id: id });
  }

  private async validateCreateAccountTypeRequest(
    request: CreateAccountTypeDto,
  ) {
    let row: AccountType;
    try {
      row = await this.accountTypeRepository.findOneBy({
        code: request.code,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Code already exists.');
    }
  }

  private async validateUpdateAccountTypeRequest(
    request: UpdateAccountTypeDto,
  ) {
    let count = 1;
    try {
      count = await this.accountTypeRepository.countBy({
        code: request.code,
      });
    } catch (err) {}

    if (count > 1) {
      throw new UnprocessableEntityException('Code already exists.');
    }
  }
}
