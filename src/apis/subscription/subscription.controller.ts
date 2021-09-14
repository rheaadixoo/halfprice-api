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
import { SubscriptionDto } from './subscription.dto';
import { SubscriptionService } from './subscription.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('subscriptions')
export class SubscriptionController { 
    constructor(private subscriptionService: SubscriptionService) {}

    @Post()
    async create(@Body(ValidationPipe) subscriptionDto: SubscriptionDto) {
        return this.subscriptionService.create(subscriptionDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.subscriptionService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.subscriptionService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.subscriptionService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) subscriptionDto: SubscriptionDto,
    ) {
        return this.subscriptionService.updateById(id, subscriptionDto);
    }
}