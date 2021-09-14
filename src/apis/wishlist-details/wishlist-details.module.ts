import { Module } from '@nestjs/common';
import { WishlistDetailsController } from './wishlist-details.controller';
import { WishlistDetailsRepository } from './wishlist-details.repository';
import { WishlistDetailsService } from './wishlist-details.service';

@Module({
    imports: [],
    controllers: [WishlistDetailsController],
    providers: [WishlistDetailsRepository, WishlistDetailsService],
    exports: [WishlistDetailsService]
})
export class WishlistDetailsModule { }
