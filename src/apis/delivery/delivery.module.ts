import { HttpModule, Module } from '@nestjs/common';
import { UserModule } from 'src/core/user/user.module';
import { AddressModule } from '../address/address.module';
import { BusinessModule } from '../business/business.module';
import { OrderModule } from '../order/order.module';
import { DeliveryController } from './delivery.controller';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryService } from './delivery.service';

@Module({
    imports: [
        HttpModule,
        BusinessModule,
        AddressModule,
        UserModule,
        OrderModule
    ],
    controllers: [DeliveryController],
    providers: [DeliveryRepository, DeliveryService],
    exports: [DeliveryService]
})
export class DeliveryModule { }
