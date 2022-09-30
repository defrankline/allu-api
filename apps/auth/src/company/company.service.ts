import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyRequest } from './dto/company.request';
import { Company } from './schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(request: CompanyRequest) {
    await this.validateCreateCompanyRequest(request);
    return await this.companyRepository.create(request);
  }

  async update(id: string, request: CompanyRequest): Promise<Company> {
    await this.validateUpdateCompanyRequest(id, request);
    const existingStudent = await this.companyRepository.findOneAndUpdate(
      { id: id },
      request,
    );
    if (!existingStudent) {
      throw new NotFoundException(`Company #${id} not found`);
    }
    return existingStudent;
  }

  async findById(id: number) {
    return await this.companyRepository.findOne({ id: id });
  }

  private async validateCreateCompanyRequest(request: CompanyRequest) {
    let company: Company;
    try {
      company = await this.companyRepository.findOne({
        number: request.number,
      });
    } catch (err) {}

    if (company) {
      throw new UnprocessableEntityException('Number already exists.');
    }
  }

  private async validateUpdateCompanyRequest(
    id: string,
    request: CompanyRequest,
  ) {
    let company: Company;
    try {
      company = await this.companyRepository.findOne({
        number: request.number,
      });
    } catch (err) {}

    if (company) {
      const foundId = company._id.toString();
      if (foundId !== id) {
        throw new UnprocessableEntityException('Number already exists.');
      }
    }
  }

  async getCompany(getCompanyArgs: Partial<Company>) {
    return this.companyRepository.findOne(getCompanyArgs);
  }
}
