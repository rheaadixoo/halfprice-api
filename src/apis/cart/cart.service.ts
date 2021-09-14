import { Injectable, Inject } from '@nestjs/common';
import { CART_REPOSITORY } from './cart.repository';
import { Cart } from './cart.model';
import { CartDto } from './cart.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepository: typeof Cart
  ) {}

  async create(cart: CartDto): Promise<Cart> {
    return this.cartRepository.create<Cart>(cart);
  }

  async findAll(filter: FindOptions) {
    return this.cartRepository.findAll(filter);
  }

  async findById(id: number): Promise<Cart> {
    return this.cartRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.cartRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.cartRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.cartRepository.upsert(data);
  }
}
