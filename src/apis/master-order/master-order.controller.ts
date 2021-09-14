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
import { MasterOrderDto } from './master-order.dto';
import { MasterOrderService } from './master-order.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('master-orders')
export class MasterOrderController { 
    constructor(private masterOrderService: MasterOrderService) {}

    @Post()
    async create(@Body(ValidationPipe) masterOrderDto: MasterOrderDto) {
        return this.masterOrderService.create(masterOrderDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.masterOrderService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.masterOrderService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.masterOrderService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) masterOrderDto: MasterOrderDto,
    ) {
        return this.masterOrderService.updateById(id, masterOrderDto);
    }
}