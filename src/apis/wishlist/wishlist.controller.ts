import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { WishlistDto } from './wishlist.dto';
import { WishlistService } from './wishlist.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('wishlists')
export class WishlistController { 
    constructor(private wishlistService: WishlistService) {}

    @Post()
    async create(@Body(ValidationPipe) wishlistDto: WishlistDto) {
        return this.wishlistService.create(wishlistDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.wishlistService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.wishlistService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.wishlistService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) wishlistDto: WishlistDto,
    ) {
        return this.wishlistService.updateById(id, wishlistDto);
    }
}