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
import { DeliveryDto } from './delivery.dto';
import { DeliveryService } from './delivery.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('deliveries')
export class DeliveryController { 
    constructor(private deliveryService: DeliveryService) {}

    @Post()
    async create(@Body(ValidationPipe) deliveryDto: DeliveryDto) {
        return this.deliveryService.create(deliveryDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.deliveryService.findAll(filter);
    }

  
    @Post('ship')
    async shipRocketLogIn() {
        return this.deliveryService.shipRocketLogIn();
    }  

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.deliveryService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.deliveryService.findById(id);
    }

   
}