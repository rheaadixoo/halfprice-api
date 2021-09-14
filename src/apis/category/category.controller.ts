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
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanPermissions } from '@can/common';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @CanPermissions({or:['CREATE_CATEGORIES']})
  @Post()
  async create(@Body(ValidationPipe) categoryDto: CategoryDto) {
    return this.categoryService.create(categoryDto);
  }

  // @CanPermissions({or:['READ_CATEGORIES']})
  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.categoryService.findAll(filter);
  }

  // @CanPermissions({or:['READ_CATEGORIES']})
  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.categoryService.count(filter);
  }

  // @CanPermissions({or:['READ_CATEGORIES']})
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findById(id);
  }

  @CanPermissions({or:['UPDATE_CATEGORIES']})
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    categoryDto: CategoryDto,
  ) {
    return this.categoryService.updateById(id, categoryDto);
  }
}
