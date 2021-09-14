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
import { TransactionDto } from './transaction.dto';
import { TransactionService } from './transaction.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanPermissions } from '@can/common';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()

  async create(@Body(ValidationPipe) transactionDto: TransactionDto) {
      return this.transactionService.create(transactionDto);
  }

  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.transactionService.findAll(filter);
  }

  // @Get()
  // async sumOfSuccessTxn(@Query('filter', ParseFilterPipe) filter: FindOptions) {
  //   return this.transactionService.sumOfSuccessTxn(filter);
  // }

  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.transactionService.count(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    transactionDto: TransactionDto,
  ) {
    return this.transactionService.updateById(id, transactionDto);
  }
}
