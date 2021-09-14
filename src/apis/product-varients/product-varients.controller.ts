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
import { ProductVarientsDto } from './product-varients.dto';
import { ProductVarientsService } from './product-varients.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('product-varients')
export class ProductVarientsController { 
    constructor(private productVarientsService: ProductVarientsService) {}

    @Post()
    async create(@Body(ValidationPipe) productVarientsDto: ProductVarientsDto) {
        return this.productVarientsService.create(productVarientsDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.productVarientsService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.productVarientsService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.productVarientsService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) productVarientsDto: ProductVarientsDto,
    ) {
        return this.productVarientsService.updateById(id, productVarientsDto);
    }
}