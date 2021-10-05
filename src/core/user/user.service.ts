import { Injectable, Inject, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { USER_REPOSITORY } from './user.repository';
import { User } from './user.model';
import { UserDto } from './user.dto';
import { FindOptions, CountOptions } from 'sequelize';
import { CanLogger } from '../logger/logger.service';
import {
  excludePropertyFromFind,
  excludePropertyFromModel,
} from '../../common/utils/exclude';
import { hashPassword } from '../../common/utils/bcrypt';
import { CanNotificationService } from '@can/notification';
import { ConfigService } from '@nestjs/config';
import { UserRoleService } from '../auth/user-role/user-role.service';
import { RoleService } from '../auth/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private canLogger: CanLogger,
    private notificationService: CanNotificationService,
    private configService: ConfigService,
    private userRoleService:UserRoleService,
    private roleService:RoleService
  ) {
    // Initialize Logger
    this.canLogger.setContext('UserService');
  }

  async create(user: UserDto): Promise<any> {
    if ('type' in user && (user.type == 'internal' || user.type == 'supplier') && user.name) {
      user.firstName = user.name.split(' ')[0];
      user.middleName =
        user.name.split(' ').length > 2 ? user.name.split(' ')[1] : '';
      user.lastName =
        user.name.split(' ').length > 1
          ? user.name.split(' ').length > 2
            ? user.name.split(' ')[2]
            : user.name.split(' ')[1]
          : '';
    }
    const userData = await this.userRepository.findOne({
      where: { mobile: user.mobile },
    });
    if (!userData) {
      const createdUser = excludePropertyFromModel<User, UserDto>(
        await this.userRepository.create(user),
        [
          'password',
          'loginOtp',
          'resetPasswordOtpExpiresIn',
          'resetPasswordOtp',
        ],
      );
     
      return createdUser;
    } else {
      throw new UnprocessableEntityException(
        'User already exist with this number :' + user.mobile
      );
    }
  }


  async findAll(filter: FindOptions) {
   
    return this.userRepository.findAll(
      excludePropertyFromFind(filter, [
        'loginInfo',
        'password',
        'loginOtp',
        'resetPasswordOtpExpiresIn',
        'resetPasswordOtp',
      ]),
    );
  }

  async findOne(filter: FindOptions) {
    return this.userRepository.findOne(filter);
  }

  async findById(id: number): Promise<UserDto> {
    return excludePropertyFromModel<User, UserDto>(
      await this.userRepository.findByPk(id),
      ['password', 'resetPasswordExpiresIn', 'resetPasswordToken'],
    );
  }

  async count(filter: CountOptions) {
    const totalCount = await this.userRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, userDto: Partial<UserDto>): Promise<number[]> {
    const user = await this.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException();
    }
    const clonedUserDto = { ...userDto };
    if (clonedUserDto.password) {
      clonedUserDto.password = await hashPassword(userDto.password);
    }
    if (userDto.firstName || userDto.middleName || userDto.lastName) {
      clonedUserDto.name = `${
        userDto.firstName ? userDto.firstName : user.firstName
      }${
        userDto.middleName
          ? ' ' + userDto.middleName
          : user.middleName
          ? ' ' + user.middleName
          : ''
      } ${userDto.lastName ? userDto.lastName : user.lastName}`;
    }
    await user.update(clonedUserDto, { where: { id } });
    return [id];
  }

  async upsert(userDto: UserDto) {
    return this.userRepository.upsert(userDto);
  }
}
