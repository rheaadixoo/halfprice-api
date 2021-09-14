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
import { CollectionDto } from './collection.dto';
import { CollectionService } from './collection.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('collections')
export class CollectionController { 
    constructor(private collectionService: CollectionService) {}

    @Post()
    async create(@Body(ValidationPipe) collectionDto: CollectionDto) {
        return this.collectionService.create(collectionDto);
    }

    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.collectionService.findAll(filter);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.collectionService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.collectionService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) collectionDto: CollectionDto,
    ) {
        return this.collectionService.updateById(id, collectionDto);
    }
}