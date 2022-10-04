import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, ILike, Repository } from 'typeorm';
import { Account, AccountBalance } from '../entities';
import {
  CreateAccountDto,
  UpdateAccountDto,
} from '../entities/dto/accounting.dtos';
import { Pagination, PaginationOptionsInterface } from '@app/common';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectEntityManager() private accountManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Account>> {
    const size = options.size || 10;
    const page = options.page || 0;
    const keyword = options.keyword || '';
    if (keyword && keyword !== '') {
      const [results, total] = await this.accountRepository.findAndCount({
        where: { name: ILike('%' + keyword + '%') },
        order: { number: 'ASC' },
        take: size,
        skip: page,
      });
      return new Pagination<Account>({
        results,
        total,
      });
    } else {
      const [results, total] = await this.accountRepository.findAndCount({
        order: { number: 'ASC' },
        take: size,
        skip: page,
      });
      return new Pagination<Account>({
        results,
        total,
      });
    }
  }

  async findAll(keyword: string): Promise<Array<Account>> {
    if (keyword && keyword !== '') {
      return await this.accountRepository.find({
        where: {
          name: ILike('%' + keyword + '%'),
          number: ILike('%' + keyword + '%'),
        },
        order: { number: 'ASC' },
      });
    } else {
      return await this.accountRepository.find({
        order: { number: 'ASC' },
      });
    }
  }

  async create(request: CreateAccountDto): Promise<Account> {
    await this.validateCreateAccountRequest(request);
    const newItem = this.accountRepository.create(request);
    return this.accountRepository.save(newItem);
  }

  async update(id: number, request: UpdateAccountDto) {
    await this.validateUpdateAccountRequest(request);
    const existingStudent = await this.accountRepository.update(
      { id: id },
      request,
    );
    if (!existingStudent) {
      throw new NotFoundException(`Account s #${id} not found`);
    }
    return existingStudent;
  }

  async findOne(id: number) {
    return await this.accountRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return this.accountRepository.delete({ id: id });
  }

  private async validateCreateAccountRequest(request: CreateAccountDto) {
    let row: Account;
    try {
      row = await this.accountRepository.findOneBy({
        number: request.number,
        company: request.company,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Number already exists.');
    }
  }

  private async validateUpdateAccountRequest(request: UpdateAccountDto) {
    let count = 1;
    try {
      count = await this.accountRepository.countBy({
        number: request.number,
        company: request.company,
      });
    } catch (err) {}

    if (count > 1) {
      throw new UnprocessableEntityException('Number already exists.');
    }
  }
}
