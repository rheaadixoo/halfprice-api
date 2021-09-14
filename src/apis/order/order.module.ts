import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/core/user/user.module';
import { AddressModule } from '../address/address.module';
import { CartDetailsModule } from '../cart-details/cart-details.module';
import { CartModule } from '../cart/cart.module';
import { PaymentModule } from '../payment/payment.module';
import { ProductModule } from '../product/product.module';
import { ProgressModule } from '../progress/progress.module';
import { SharedModule } from '../shared/shared.module';
import { TransactionModule } from '../transaction/transaction.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [
    UserModule,
    AddressModule,
    SharedModule,
    ConfigModule,
    ProductModule,
    CartModule,
    CartDetailsModule,
    forwardRef(() => TransactionModule),
    forwardRef(() => PaymentModule),
    forwardRef(() => ProgressModule),
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
