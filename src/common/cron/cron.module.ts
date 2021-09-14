import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentModule } from 'src/apis/payment/payment.module';
import { TransactionModule } from 'src/apis/transaction/transaction.module';
import { CronService } from './cron.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TransactionModule,
    HttpModule,
    PaymentModule],
  providers: [CronService],
  exports: [ScheduleModule],
})
export class CronModule {}
