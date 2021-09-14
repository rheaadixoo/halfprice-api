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
import { InvoiceDto } from './invoice.dto';
import { InvoiceService } from './invoice.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('invoices')
export class InvoiceController { 
    constructor(private invoiceService: InvoiceService) {}

    @Post()
    async create(@Body(ValidationPipe) invoiceDto: InvoiceDto) {
        return this.invoiceService.create(invoiceDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.invoiceService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.invoiceService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.invoiceService.findById(id);
    }

    @Get('generate/:cartId/:businessId')
    async generateInvoice(
        @Param('cartId', ParseIntPipe) cartId: number,
        @Param('businessId', ParseIntPipe) businessId: number
        ) {
        return this.invoiceService.generateInvoice(cartId, businessId);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) invoiceDto: InvoiceDto,
    ) {
        return this.invoiceService.updateById(id, invoiceDto);
    }
}