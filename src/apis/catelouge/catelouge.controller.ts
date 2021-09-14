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
import { CatelougeDto } from './catelouge.dto';
import { CatelougeService } from './catelouge.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('catelouges')
export class CatelougeController { 
    constructor(private catelougeService: CatelougeService) {}

    @Post()
    async create(@Body(ValidationPipe) catelougeDto: CatelougeDto) {
        return this.catelougeService.create(catelougeDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.catelougeService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.catelougeService.count(filter);
    }

    @Post('/upload')
    async upload(
        @Body(ValidationPipe) catelougeDto: CatelougeDto
        ) {
        return this.catelougeService.upload(catelougeDto);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.catelougeService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) catelougeDto: CatelougeDto,
    ) {
        return this.catelougeService.updateById(id, catelougeDto);
    }
}