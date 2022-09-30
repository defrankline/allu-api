import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { MongoAbstractRepository } from '@app/common';
import { Company } from './schemas/company.schema';

@Injectable()
export class CompanyRepository extends MongoAbstractRepository<Company> {
  protected readonly logger = new Logger(CompanyRepository.name);

  constructor(
    @InjectModel(Company.name) companyModel: Model<Company>,
    @InjectConnection() connection: Connection,
  ) {
    super(companyModel, connection);
  }
}