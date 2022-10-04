import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, PaginationOptionsInterface } from '@app/common';
import { Share } from './share';
import { CreateShareRequest, UpdateShareRequest } from '../dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share)
    private readonly shareRepository: Repository<Share>,
  ) {}

  async paginate(
    options: PaginationOptionsInterface,
    member = 0,
  ): Promise<Pagination<Share>> {
    const size = options.size || 10;
    const page = options.page || 0;
    if (member > 0) {
      const [results, total] = await this.shareRepository.findAndCount({
        where: { member: member },
        order: { date: 'desc' },
        take: size,
        skip: page,
      });
      return new Pagination<Share>({
        results,
        total,
      });
    } else {
      const [results, total] = await this.shareRepository.findAndCount({
        order: { date: 'desc' },
        take: size,
        skip: page,
      });
      return new Pagination<Share>({
        results,
        total,
      });
    }
  }

  async findAll(member = 0): Promise<Array<Share>> {
    if (member > 0) {
      return await this.shareRepository.find({
        where: { member: member },
        order: { date: 'desc' },
      });
    } else {
      return await this.shareRepository.find({
        order: { date: 'desc' },
      });
    }
  }

  async create(request: CreateShareRequest): Promise<Share> {
    const newItem = this.shareRepository.create(request);
    return this.shareRepository.save(newItem);
  }

  async update(id: number, request: UpdateShareRequest) {
    const existingShare = await this.shareRepository.update(
      { id: id },
      request,
    );
    if (!existingShare) {
      throw new NotFoundException(`Share #${id} not found`);
    }
    return existingShare;
  }

  async findById(id: number) {
    return this.shareRepository.findOneBy({ id: id });
  }

  async delete(id: number) {
    return this.shareRepository.delete({ id: id });
  }
}
