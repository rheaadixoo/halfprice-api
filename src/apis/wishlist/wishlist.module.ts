import { Module } from '@nestjs/common';
import { WishlistController } from './wishlist.controller';
import { WishlistRepository } from './wishlist.repository';
import { WishlistService } from './wishlist.service';

@Module({
    imports: [],
    controllers: [WishlistController],
    providers: [WishlistRepository, WishlistService],
    exports: [WishlistService]
})
export class WishlistModule { }
