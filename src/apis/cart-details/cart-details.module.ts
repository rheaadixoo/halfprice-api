import { Module } from '@nestjs/common';
import { CartDetailsController } from './cart-details.controller';
import { CartDetailsRepository } from './cart-details.repository';
import { CartDetailsService } from './cart-details.service';

@Module({
    imports: [],
    controllers: [CartDetailsController],
    providers: [CartDetailsRepository, CartDetailsService],
    exports: [CartDetailsService]
})
export class CartDetailsModule { }
