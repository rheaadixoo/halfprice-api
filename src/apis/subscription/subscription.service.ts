import { Injectable, Inject } from '@nestjs/common';
import { SUBSCRIPTION_REPOSITORY } from './subscription.repository';
import { Subscription } from './subscription.model';
import { SubscriptionDto } from './subscription.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: typeof Subscription
  ) {}

  async create(subscription: SubscriptionDto): Promise<Subscription> {
    return this.subscriptionRepository.create<Subscription>(subscription);
  }

  async findAll(filter: FindOptions) {
    return this.subscriptionRepository.findAll(filter);
  }

  async findById(id: number): Promise<Subscription> {
    return this.subscriptionRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.subscriptionRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.subscriptionRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.subscriptionRepository.upsert(data);
  }
}
