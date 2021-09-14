import { Injectable, Inject } from '@nestjs/common';
import { COLOR_REPOSITORY } from './color.repository';
import { Color } from './color.model';
import { ColorDto } from './color.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ColorService {
  constructor(
    @Inject(COLOR_REPOSITORY) private readonly colorRepository: typeof Color
  ) {}

  async create(color: ColorDto): Promise<Color> {
    return this.colorRepository.create<Color>(color);
  }

  async findAll(filter: FindOptions) {
    return this.colorRepository.findAll(filter);
  }

  async findById(id: number): Promise<Color> {
    return this.colorRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.colorRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.colorRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.colorRepository.upsert(data);
  }
}
