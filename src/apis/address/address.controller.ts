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
import { AddressDto } from './address.dto';
import { AddressService } from './address.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('addresses')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  async create(@Body(ValidationPipe) addressDto: AddressDto) {
    return this.addressService.create(addressDto);
  }

  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.addressService.findAll(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.findById(id);
  }

  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.addressService.count(filter);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    addressDto: AddressDto,
  ) {
    return this.addressService.updateById(id, addressDto);
  }

}
