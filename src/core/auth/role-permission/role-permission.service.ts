import { Injectable, Inject } from '@nestjs/common';
import { ROLEPERMISSION_REPOSITORY } from './role-permission.repository';
import { RolePermission } from './role-permission.model';
import { RolePermissionsDto } from './role-permission.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class RolePermissionService {
  constructor(
    @Inject(ROLEPERMISSION_REPOSITORY)
    private readonly rolePermissionsRepository: typeof RolePermission,
  ) {}

  async create(rolePermissions: RolePermissionsDto): Promise<RolePermission> {
    return this.rolePermissionsRepository.create<RolePermission>(
      rolePermissions,
    );
  }

  async findAll(filter: FindOptions) {
    return this.rolePermissionsRepository.findAll(filter);
  }

  async findById(id: number): Promise<RolePermission> {
    return this.rolePermissionsRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.rolePermissionsRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.rolePermissionsRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.rolePermissionsRepository.upsert(data);
  }
}
