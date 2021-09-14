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
  Delete,
} from '@nestjs/common';
import { WishlistDetailsDto } from './wishlist-details.dto';
import { WishlistDetailsService } from './wishlist-details.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('wishlist-details')
export class WishlistDetailsController { 
    constructor(private wishlistDetailsService: WishlistDetailsService) {}

    @Post()
    async create(@Body(ValidationPipe) wishlistDetailsDto: WishlistDetailsDto) {
        return this.wishlistDetailsService.create(wishlistDetailsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.wishlistDetailsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.wishlistDetailsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.wishlistDetailsService.findById(id);
    }
    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.wishlistDetailsService.deleteById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) wishlistDetailsDto: WishlistDetailsDto,
    ) {
        return this.wishlistDetailsService.updateById(id, wishlistDetailsDto);
    }
}