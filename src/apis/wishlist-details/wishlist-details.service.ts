import { Injectable, Inject } from '@nestjs/common';
import { WISHLISTDETAILS_REPOSITORY } from './wishlist-details.repository';
import { WishlistDetails } from './wishlist-details.model';
import { WishlistDetailsDto } from './wishlist-details.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class WishlistDetailsService {
  constructor(
    @Inject(WISHLISTDETAILS_REPOSITORY) private readonly wishlistDetailsRepository: typeof WishlistDetails
  ) {}

  async create(wishlistDetails: WishlistDetailsDto): Promise<WishlistDetails> {
    return this.wishlistDetailsRepository.create<WishlistDetails>(wishlistDetails);
  }

  async findAll(filter: FindOptions) {
    return this.wishlistDetailsRepository.findAll(filter);
  }

  async deleteById(id: any): Promise<any> {
    return this.wishlistDetailsRepository.destroy({where:{id}});
  }

  async findById(id: number): Promise<WishlistDetails> {
    return this.wishlistDetailsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.wishlistDetailsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.wishlistDetailsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.wishlistDetailsRepository.upsert(data);
  }
}
