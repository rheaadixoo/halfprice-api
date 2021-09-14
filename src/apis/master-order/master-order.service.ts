import { Injectable, Inject } from '@nestjs/common';
import { MASTERORDER_REPOSITORY } from './master-order.repository';
import { MasterOrder } from './master-order.model';
import { MasterOrderDto } from './master-order.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class MasterOrderService {
  constructor(
    @Inject(MASTERORDER_REPOSITORY) private readonly masterOrderRepository: typeof MasterOrder
  ) {}

  async create(masterOrder: MasterOrderDto): Promise<MasterOrder> {
    return this.masterOrderRepository.create<MasterOrder>(masterOrder);
  }

  async findAll(filter: FindOptions) {
    return this.masterOrderRepository.findAll(filter);
  }

  async findById(id: number): Promise<MasterOrder> {
    return this.masterOrderRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.masterOrderRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.masterOrderRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.masterOrderRepository.upsert(data);
  }
}
