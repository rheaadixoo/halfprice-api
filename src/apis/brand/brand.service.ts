import { Injectable, Inject } from '@nestjs/common';
import { BRAND_REPOSITORY } from './brand.repository';
import { Brand } from './brand.model';
import { BrandDto } from './brand.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class BrandService {
  constructor(
    @Inject(BRAND_REPOSITORY) private readonly brandRepository: typeof Brand
  ) {}

  async create(brand: BrandDto): Promise<Brand> {
    return this.brandRepository.create<Brand>(brand);
  }

  async findAll(filter: FindOptions) {
    return this.brandRepository.findAll(filter);
  }

  async findById(id: number): Promise<Brand> {
    return this.brandRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.brandRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.brandRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.brandRepository.upsert(data);
  }
}
