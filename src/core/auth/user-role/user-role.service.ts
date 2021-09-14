import { Injectable, Inject } from '@nestjs/common';
import { USERROLE_REPOSITORY } from './user-role.repository';
import { UserRole } from './user-role.model';
import { UserRoleDto } from './user-role.dto';
import { FindOptions, CountOptions } from 'sequelize/types';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject(USERROLE_REPOSITORY)
    private readonly userRolesRepository: typeof UserRole,
  ) {}

  async create(userRoles: UserRoleDto): Promise<UserRole> {
    return this.userRolesRepository.create<UserRole>(userRoles);
  }

  async findAll(filter: FindOptions) {
    return this.userRolesRepository.findAll(filter);
  }

  async findById(id: number): Promise<UserRole> {
    return this.userRolesRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userRolesRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: object) {
    return this.userRolesRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.userRolesRepository.upsert(data);
  }
}
