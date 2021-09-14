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
import { PermissionDto } from './permission.dto';
import { PermissionService } from './permission.service';
import { ParseFilterPipe } from '../../../common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanPermissions } from '@can/common';

@Controller('permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @CanPermissions({or:['CREATE_PERMISSION']})
  @Post()
  async create(@Body(ValidationPipe) permissionDto: PermissionDto) {
    return this.permissionService.create(permissionDto);
  }

  @CanPermissions({or:['READ_PERMISSION']})
  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.permissionService.findAll(filter);
  }

  @CanPermissions({or:['READ_PERMISSION']})
  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.permissionService.count(filter);
  }

  @CanPermissions({or:['READ_PERMISSION']})
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findById(id);
  }

  @CanPermissions({or:['UPDATE_PERMISSION']})
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    permissionDto: PermissionDto,
  ) {
    return this.permissionService.updateById(id, permissionDto);
  }
}
