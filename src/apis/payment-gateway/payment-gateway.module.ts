import { Module } from '@nestjs/common';
import { PaymentGatewayController } from './payment-gateway.controller';
import { PaymentGatewayRepository } from './payment-gateway.repository';
import { PaymentGatewayService } from './payment-gateway.service';

@Module({
    imports: [],
    controllers: [PaymentGatewayController],
    providers: [PaymentGatewayRepository, PaymentGatewayService],
    exports: [PaymentGatewayService]
})
export class PaymentGatewayModule { }
