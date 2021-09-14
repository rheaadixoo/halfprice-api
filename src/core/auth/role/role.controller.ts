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
import { RoleDto } from './role.dto';
import { RoleService } from './role.service';
import { ParseFilterPipe } from '../../../common/pipes/parse-filter.pipe';
import { FindOptions, CountOptions } from 'sequelize';
import { CanStateMachine } from 'libs/state-machine/src';
import { CanPermissions } from '@can/common';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @CanPermissions({or:['CREATE_ROLES']})
  @Post()
  async create(@Body(ValidationPipe) roleDto: RoleDto) {
    return this.roleService.create(roleDto);
  }

  @CanPermissions({or:['READ_ROLES']})
  @Get()
  async findAll(@Query('filter', ParseFilterPipe) filter: FindOptions) {
    return this.roleService.findAll(filter);
  }

  @CanPermissions({or:['READ_ROLES']})
  @Get('count')
  async count(@Query('filter', ParseFilterPipe) filter: CountOptions) {
    return this.roleService.count(filter);
  }

  @CanPermissions({or:['READ_ROLES']})
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.findById(id);
  }

  @CanPermissions({or:['UPDATE_ROLES']})
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ skipMissingProperties: true })) roleDto: RoleDto,
  ) {
    return this.roleService.updateById(id, roleDto);
  }
}
