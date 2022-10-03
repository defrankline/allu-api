import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company';
import { CreateCompanyRequest } from './dto';
import { UpdateCompanyRequest } from './dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly userRepository: Repository<Company>,
  ) {}

  async create(request: CreateCompanyRequest) {
    await this.validateCreateCompanyRequest(request);
    const newItem = this.userRepository.create(request);
    return this.userRepository.save(newItem);
  }

  async update(id: number, updateCompanyDto: UpdateCompanyRequest) {
    await this.validateUpdateCompanyRequest(updateCompanyDto);
    const existingCompany = await this.userRepository.update(
      { id: id },
      updateCompanyDto,
    );
    if (!existingCompany) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return existingCompany;
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  private async validateCreateCompanyRequest(request: CreateCompanyRequest) {
    let row: Company;
    try {
      row = await this.userRepository.findOneBy({
        number: request.number,
      });
    } catch (err) {}

    if (row) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  private async validateUpdateCompanyRequest(request: UpdateCompanyRequest) {
    let count = 1;
    try {
      count = await this.userRepository.countBy({
        number: request.number,
      });
    } catch (err) {}
    if (count > 1) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async getCompany(getCompanyArgs: Partial<Company>) {
    return this.userRepository.findOneBy(getCompanyArgs);
  }

  async getCompanies(getCompanyArgs: Partial<Company>) {
    return this.userRepository.findBy(getCompanyArgs);
  }

  async delete(id: number) {
    return this.userRepository.delete({ id: id });
  }
}
