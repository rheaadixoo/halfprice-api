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
import { SubCategoryDto } from './sub-category.dto';
import { SubCategoryService } from './sub-category.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Post()
  async create(@Body(ValidationPipe) subCategoryDto: SubCategoryDto) {
    return this.subCategoryService.create(subCategoryDto);
  }

  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.subCategoryService.findAll(filter);
  }

  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.subCategoryService.count(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.subCategoryService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    subCategoryDto: SubCategoryDto,
  ) {
    return this.subCategoryService.updateById(id, subCategoryDto);
  }
}
