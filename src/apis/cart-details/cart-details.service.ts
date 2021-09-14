import { Injectable, Inject } from '@nestjs/common';
import { CARTDETAILS_REPOSITORY } from './cart-details.repository';
import { CartDetails } from './cart-details.model';
import { CartDetailsDto } from './cart-details.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class CartDetailsService {
  constructor(
    @Inject(CARTDETAILS_REPOSITORY) private readonly cartDetailsRepository: typeof CartDetails
  ) {}

  async create(cartDetails: CartDetailsDto): Promise<CartDetails> {
    return this.cartDetailsRepository.create<CartDetails>(cartDetails);
  }

  async findAll(filter: FindOptions) {
    return this.cartDetailsRepository.findAll(filter);
  }

  async findById(id: number): Promise<CartDetails> {
    return this.cartDetailsRepository.findByPk(id);
  }


  async deleteById(id: any): Promise<any> {
    return this.cartDetailsRepository.destroy({where:{id}});
  }

  async count(filter: CountOptions) {
    const totalCount = await this.cartDetailsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.cartDetailsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.cartDetailsRepository.upsert(data);
  }
}
