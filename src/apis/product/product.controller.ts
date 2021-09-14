/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductDto, ProductStatusDto } from './product.dto';
import { ProductService } from './product.service';
import { ParseFilterPipe } from 'src/common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanCurrentUser, CanExportResponse, CanFileService, CanPermissions, CurrentUser } from '@can/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

    @Post()
    async create(@Body(ValidationPipe) productDto: ProductDto) {
        return this.productService.create(productDto);
    }

    @Post('status')
    async statusUpdate(@Body(ValidationPipe) productDto: ProductStatusDto) {
        return this.productService.statusUpdate(productDto);
    }

    
    // @CanExportResponse()
    @Get()
    async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
        return this.productService.findAll(filter);
    }

    @Post('/upload')
    @UseInterceptors(
        FilesInterceptor('files', 1, { storage: CanFileService.getFilesStorage() }),
      )
    async upload(
        @UploadedFiles() files,
         @CurrentUser() user:CanCurrentUser
        ) {
        return this.productService.upload(files,user);
    }

    @Get('count')
    async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
        return this.productService.count(filter);
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findById(id);
    }

    @Patch(':id')
    async updateById(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ skipMissingProperties: true })) productDto: ProductDto,
    ) {
        return this.productService.updateById(id, productDto);
    }
}
