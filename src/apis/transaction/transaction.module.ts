import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';
import { OrderModule } from '../order/order.module';
import { PaymentModule } from '../payment/payment.module';
import { ProgressModule } from '../progress/progress.module';
import { SharedModule } from '../shared/shared.module';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';

@Module({
    imports: [
        forwardRef(() => OrderModule),
        forwardRef(() =>PaymentModule),
        forwardRef(() => ProgressModule),
        SharedModule,
        UserModule
    ],
    controllers: [TransactionController],
    providers: [TransactionRepository, TransactionService],
    exports: [TransactionService]
})
export class TransactionModule { }
