import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';
import { AddressModule } from '../address/address.module';
import { OrderModule } from '../order/order.module';
import { PaymentGatewayModule } from '../payment-gateway/payment-gateway.module';
import { ProgressModule } from '../progress/progress.module';
import { SharedModule } from '../shared/shared.module';
import { StatusModule } from '../status/status.module';
import { TransactionModule } from '../transaction/transaction.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaytmService } from './paytm.service';

@Module({
  imports: [
    PaymentGatewayModule,
    UserModule,
    SharedModule,
    AddressModule,    
     StatusModule,
     HttpModule,
    forwardRef(() => ProgressModule),
    forwardRef(() => TransactionModule),
    forwardRef(() => OrderModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaytmService],
  exports: [PaymentService],
})
export class PaymentModule {}
