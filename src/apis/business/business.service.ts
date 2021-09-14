import { Injectable, Inject } from '@nestjs/common';
import { BUSINESS_REPOSITORY } from './business.repository';
import { Business } from './business.model';
import { BusinessDto } from './business.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class BusinessService {
  constructor(
    @Inject(BUSINESS_REPOSITORY) private readonly businessRepository: typeof Business
  ) {}

  async create(business: BusinessDto): Promise<Business> {
    return this.businessRepository.create<Business>(business);
  }

  async findAll(filter: FindOptions) {
    return this.businessRepository.findAll(filter);
  }

  async findById(id: number): Promise<Business> {
    return this.businessRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.businessRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.businessRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.businessRepository.upsert(data);
  }
}
