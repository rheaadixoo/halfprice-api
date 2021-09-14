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
import { PaymentGatewayDto } from './payment-gateway.dto';
import { PaymentGatewayService } from './payment-gateway.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('payment-gateways')
export class PaymentGatewayController { 
    constructor(private paymentGatewayService: PaymentGatewayService) {}

    @Post()
    async create(@Body(ValidationPipe) paymentGatewayDto: PaymentGatewayDto) {
        return this.paymentGatewayService.create(paymentGatewayDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.paymentGatewayService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.paymentGatewayService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.paymentGatewayService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) paymentGatewayDto: PaymentGatewayDto,
    ) {
        return this.paymentGatewayService.updateById(id, paymentGatewayDto);
    }
}