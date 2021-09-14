import { Injectable, Inject } from '@nestjs/common';
import { WISHLIST_REPOSITORY } from './wishlist.repository';
import { Wishlist } from './wishlist.model';
import { WishlistDto } from './wishlist.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class WishlistService {
  constructor(
    @Inject(WISHLIST_REPOSITORY) private readonly wishlistRepository: typeof Wishlist
  ) {}

  async create(wishlist: WishlistDto): Promise<Wishlist> {
    return this.wishlistRepository.create<Wishlist>(wishlist);
  }

  async findAll(filter: FindOptions) {
    return this.wishlistRepository.findAll(filter);
  }

  async findById(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.wishlistRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.wishlistRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.wishlistRepository.upsert(data);
  }
}
