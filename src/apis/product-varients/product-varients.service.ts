import { Injectable, Inject } from '@nestjs/common';
import { PRODUCTVARIENTS_REPOSITORY } from './product-varients.repository';
import { ProductVarients } from './product-varients.model';
import { ProductVarientsDto } from './product-varients.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ProductVarientsService {
  constructor(
    @Inject(PRODUCTVARIENTS_REPOSITORY) private readonly productVarientsRepository: typeof ProductVarients
  ) {}

  async create(productVarients: ProductVarientsDto): Promise<ProductVarients> {
    return this.productVarientsRepository.create<ProductVarients>(productVarients);
  }

  async findAll(filter: FindOptions) {
    return this.productVarientsRepository.findAll(filter);
  }

  async findById(id: number): Promise<ProductVarients> {
    return this.productVarientsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.productVarientsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.productVarientsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.productVarientsRepository.upsert(data);
  }
}
