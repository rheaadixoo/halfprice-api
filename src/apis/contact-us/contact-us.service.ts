import { Injectable, Inject } from '@nestjs/common';
import { CONTACTUS_REPOSITORY } from './contact-us.repository';
import { ContactUs } from './contact-us.model';
import { ContactUsDto } from './contact-us.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class ContactUsService {
  constructor(
    @Inject(CONTACTUS_REPOSITORY) private readonly contactUsRepository: typeof ContactUs
  ) {}

  async create(contactUs: ContactUsDto): Promise<ContactUs> {
    return this.contactUsRepository.create<ContactUs>(contactUs);
  }

  async findAll(filter: FindOptions) {
    return this.contactUsRepository.findAll(filter);
  }

  async findById(id: number): Promise<ContactUs> {
    return this.contactUsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.contactUsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.contactUsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.contactUsRepository.upsert(data);
  }
}
