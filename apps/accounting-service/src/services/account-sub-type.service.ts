import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AccountSubType } from '../entities';
import {
  CreateAccountSubTypeDto,
  UpdateAccountSubTypeDto,
} from '../entities/dto/accounting.dtos';
import { Pagination, PaginationOptionsInterface } from '@app/common';

@Injectable()
export class AccountSubTypeService {
  constructor(
    @InjectRepository(AccountSubType)
    private readonly accountSubTypeRepository: Repository<AccountSubType>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<AccountSubType>> {
    const size = options.size || 10;
    const page = options.page || 0;
    const keyword = options.keyword || '';
    if (keyword && keyword !== '') {
      const [results, total] = await this.accountSubTypeRepository.findAndCount(
        {
          where: { name: ILike('%' + keyword + '%') },
          order: { code: 'ASC' },
          take: size,
          skip: page,
        },
      );
      return new Pagination<AccountSubType>({
        results,
        total,
      });
    } else {
      const [results, total] = await this.accountSubTypeRepository.findAndCount(
        {
          order: { code: 'ASC' },
          take: size,
          skip: page,
        },
      );
      return new Pagination<AccountSubType>({
        results,
        total,
      });
    }
  }

  async findAll(keyword: string): Promise<Array<AccountSubType>> {
    if (keyword && keyword !== '') {
      return await this.accountSubTypeRepository.find({
        where: { name: ILike('%' + keyword + '%') },
        order: { code: 'ASC' },
      });
    } else {
      return await this.accountSubTypeRepository.find({
        order: { code: 'ASC' },
      });
    }
  }

  async create(request: CreateAccountSubTypeDto): Promise<AccountSubType> {
    await this.validateCreateAccountSubTypeRequest(request);
    const newItem = this.accountSubTypeRepository.create(request);
    return this.accountSubTypeRepository.save(newItem);
  }

  async update(id: number, request: UpdateAccountSubTypeDto) {
    await this.validateUpdateAccountSubTypeRequest(request);
    const existingStudent = await this.accountSubTypeRepository.update(
      { id: id },
      request,
    );
    if (!existingStudent) {
      throw new NotFoundException(`Account Sub Types #${id} not found`);
    }
    return existingStudent;
  }

  async findById(id: number) {
    return this.accountSubTypeRepository.findOneBy({ id: id });
  }

  async delete(id: number) {
    return this.accountSubTypeRepository.delete({ id: id });
  }

  private async validateCreateAccountSubTypeRequest(
    request: CreateAccountSubTypeDto,
  ) {
    let row: AccountSubType;
    try {
      row = await this.accountSubTypeRepository.findOneBy({
        code: request.code,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Code already exists.');
    }
  }

  private async validateUpdateAccountSubTypeRequest(
    request: UpdateAccountSubTypeDto,
  ) {
    let count = 1;
    try {
      count = await this.accountSubTypeRepository.countBy({
        code: request.code,
      });
    } catch (err) {}

    if (count > 1) {
      throw new UnprocessableEntityException('Code already exists.');
    }
  }
}
