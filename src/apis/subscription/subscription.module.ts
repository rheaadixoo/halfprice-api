import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';

@Module({
    imports: [],
    controllers: [SubscriptionController],
    providers: [SubscriptionRepository, SubscriptionService],
    exports: [SubscriptionService]
})
export class SubscriptionModule { }
