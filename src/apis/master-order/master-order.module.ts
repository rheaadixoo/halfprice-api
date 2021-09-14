import { Module } from '@nestjs/common';
import { MasterOrderController } from './master-order.controller';
import { MasterOrderRepository } from './master-order.repository';
import { MasterOrderService } from './master-order.service';

@Module({
    imports: [],
    controllers: [MasterOrderController],
    providers: [MasterOrderRepository, MasterOrderService],
    exports: [MasterOrderService]
})
export class MasterOrderModule { }
