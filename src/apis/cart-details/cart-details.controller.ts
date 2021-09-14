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
import { CartDetailsDto } from './cart-details.dto';
import { CartDetailsService } from './cart-details.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('cart-details')
export class CartDetailsController { 
    constructor(private cartDetailsService: CartDetailsService) {}

    @Post()
    async create(@Body(ValidationPipe) cartDetailsDto: CartDetailsDto) {
        return this.cartDetailsService.create(cartDetailsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.cartDetailsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.cartDetailsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.cartDetailsService.findById(id);
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.cartDetailsService.deleteById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) cartDetailsDto: CartDetailsDto,
    ) {
        return this.cartDetailsService.updateById(id, cartDetailsDto);
    }
}