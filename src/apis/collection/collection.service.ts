import { Injectable, Inject } from '@nestjs/common';
import { COLLECTION_REPOSITORY } from './collection.repository';
import { Collection } from './collection.model';
import { CollectionDto } from './collection.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class CollectionService {
  constructor(
    @Inject(COLLECTION_REPOSITORY) private readonly collectionRepository: typeof Collection
  ) {}

  async create(collection: CollectionDto): Promise<Collection> {
    return this.collectionRepository.create<Collection>(collection);
  }

  async findAll(filter: FindOptions) {
    return this.collectionRepository.findAll(filter);
  }

  async findById(id: number): Promise<Collection> {
    return this.collectionRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.collectionRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.collectionRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.collectionRepository.upsert(data);
  }
}
