import { Injectable, Inject } from '@nestjs/common';
import { ADDRESS_REPOSITORY } from './address.repository';
import { Address } from './address.model';
import { AddressDto } from './address.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { Op } from 'sequelize';

@Injectable()
export class AddressService {
  constructor(
    @Inject(ADDRESS_REPOSITORY) private readonly addressRepository: typeof Address,
  ) {}

  async create(address: AddressDto): Promise<Address> {
    return this.addressRepository.create<Address>(address);
  }

  async findAll(filter: FindOptions) {
    return this.addressRepository.findAll(filter);
  }

  async findById(id: number): Promise<Address> {
    return this.addressRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    return this.addressRepository.count(filter);
  }

  async updateById(id: number, data: object) {
    return this.addressRepository.update(data, { where: { id } });
  }


  async upsert(data: object) {
    return this.addressRepository.upsert(data);
  }
}
