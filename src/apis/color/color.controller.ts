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
import { ColorDto } from './color.dto';
import { ColorService } from './color.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanPermissions } from '@can/common';

@Controller('colors')
export class ColorController { 
    constructor(private colorService: ColorService) {}

    @Post()
    async create(@Body(ValidationPipe) colorDto: ColorDto) {
        return this.colorService.create(colorDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.colorService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.colorService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.colorService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) colorDto: ColorDto,
    ) {
        return this.colorService.updateById(id, colorDto);
    }
}