import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import { CartService } from './cart.service';

@Module({
    imports: [],
    controllers: [CartController],
    providers: [CartRepository, CartService],
    exports: [CartService]
})
export class CartModule { }
