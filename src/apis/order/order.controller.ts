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
import { OrderDto } from './order.dto';
import { OrderService } from './order.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanPermissions } from '@can/common';


@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}


  @Post()
  async create(@Body(ValidationPipe) orderDto: OrderDto) {
    return this.orderService.create(orderDto);
  }

  @Post('retry')
  async retryOrderTransaction(
    @Body(ValidationPipe) order: { orderNumber: string; payLater?: boolean },
  ) {
    return this.orderService.retryOrderTransaction(
      order.orderNumber,
      order.payLater,
    );
  }

  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.orderService.findAll(filter);
  }

  // @Get('items')
  // async getOrderItems(
  //   @Query('id') id: string,
  //   ) {
  //   return this.orderService.getOrderItems(id);
  // }

  @Get('products')
  async products(
    @Query('id') id: string
  ){
    return this.orderService.getOrderDetails(id)
  }
  // @Get('items')
  // generate(
  //   @Param('id', ParseIntPipe) id: number
  // ) {
  //   return this.orderService.getOrderItems(id);
  // }

  @Get('amount')
  async calculateOrderAmount(@Query('cartId') cartId: string) {
    return this.orderService.calculateOrderAmount(parseInt(cartId));
  }

  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.orderService.count(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number,@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.orderService.findById(id,filter);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    orderDto: OrderDto,
  ) {
    return this.orderService.updateById(id, orderDto);
  }
}
