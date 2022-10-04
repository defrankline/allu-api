import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Pagination, PaginationOptionsInterface } from '@app/common';
import { ShareType } from './share-type';
import { CreateShareTypeRequest, UpdateShareTypeRequest } from '../dto';

@Injectable()
export class ShareTypeService {
  constructor(
    @InjectRepository(ShareType)
    private readonly shareTypeRepository: Repository<ShareType>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
    keyword: string,
  ): Promise<Pagination<ShareType>> {
    const size = options.size || 10;
    const page = options.page || 0;
    if (keyword) {
      const [results, total] = await this.shareTypeRepository.findAndCount({
        where: { name: ILike('%' + keyword + '%') },
        order: { name: 'asc' },
        take: size,
        skip: page,
      });
      return new Pagination<ShareType>({
        results,
        total,
      });
    } else {
      const [results, total] = await this.shareTypeRepository.findAndCount({
        order: { name: 'asc' },
        take: size,
        skip: page,
      });
      return new Pagination<ShareType>({
        results,
        total,
      });
    }
  }

  async findAll(keyword: string): Promise<Array<ShareType>> {
    if (keyword) {
      return await this.shareTypeRepository.find({
        where: { name: ILike('%' + keyword + '%') },
        order: { name: 'asc' },
      });
    } else {
      return await this.shareTypeRepository.find({
        order: { name: 'asc' },
      });
    }
  }

  async create(request: CreateShareTypeRequest): Promise<ShareType> {
    const newItem = this.shareTypeRepository.create(request);
    return this.shareTypeRepository.save(newItem);
  }

  async update(id: number, request: UpdateShareTypeRequest) {
    const existingShareType = await this.shareTypeRepository.update(
      { id: id },
      request,
    );
    if (!existingShareType) {
      throw new NotFoundException(`Share Type #${id} not found`);
    }
    return existingShareType;
  }

  async findById(id: number) {
    return this.shareTypeRepository.findOneBy({ id: id });
  }

  async delete(id: number) {
    return this.shareTypeRepository.delete({ id: id });
  }
}
