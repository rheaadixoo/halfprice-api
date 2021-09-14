import { Injectable, Inject } from '@nestjs/common';
import { PAYMENTGATEWAY_REPOSITORY } from './payment-gateway.repository';
import { PaymentGateway } from './payment-gateway.model';
import { PaymentGatewayDto } from './payment-gateway.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class PaymentGatewayService {
  constructor(
    @Inject(PAYMENTGATEWAY_REPOSITORY) private readonly paymentGatewayRepository: typeof PaymentGateway
  ) {}

  async create(paymentGateway: PaymentGatewayDto): Promise<PaymentGateway> {
    return this.paymentGatewayRepository.create<PaymentGateway>(paymentGateway);
  }

  async findAll(filter: FindOptions) {
    return this.paymentGatewayRepository.findAll(filter);
  }

  async findById(id: number): Promise<PaymentGateway> {
    return this.paymentGatewayRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.paymentGatewayRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.paymentGatewayRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.paymentGatewayRepository.upsert(data);
  }
}
