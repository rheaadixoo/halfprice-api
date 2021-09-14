import { Injectable, Inject } from '@nestjs/common';
import { STATUS_REPOSITORY } from './status.repository';
import { Status } from './status.model';
import { StatusDto } from './status.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class StatusService {
  constructor(
    @Inject(STATUS_REPOSITORY) private readonly statusRepository: typeof Status
  ) {}

  async create(status: StatusDto): Promise<Status> {
    return this.statusRepository.create<Status>(status);
  }

  async findAll(filter: FindOptions) {
    return this.statusRepository.findAll(filter);
  }

  async findById(id: number): Promise<Status> {
    return this.statusRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.statusRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.statusRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.statusRepository.upsert(data);
  }
}
