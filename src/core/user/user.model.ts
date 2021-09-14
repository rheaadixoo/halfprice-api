import {
  Table,
  Model,
  Column,
  DataType,
  BeforeCreate,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Business } from 'src/apis/business/business.model';
import { hashPassword } from '../../common/utils/bcrypt';
import { UserRole } from '../auth/user-role/user-role.model';

@Table({
  tableName: 'users',
  // defaultScope: { attributes: { exclude: ['password'] } },
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'first_name',
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    field: 'middle_name',
  })
  middleName: string;

  @Column({
    type: DataType.STRING,
    field: 'last_name',
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    field: 'name',
    allowNull: true,
  })
  name: string;


  @Column({
    type: DataType.STRING,
    field: 'email',
    allowNull: true,
    unique: true,  
  })
  email: string;

  @Column({
    type: DataType.STRING,
    field: 'mobile',
    allowNull: true,
    // unique: true,
  })
  mobile: string;

  @Column({
    type: DataType.STRING,
    field: 'login_info',
  })
  loginInfo: string;

  @Column({
    type: DataType.STRING,
    field: 'password',
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    field: 'reset_password_otp_expires_in',
  })
  resetPasswordOtpExpiresIn: string;

  @Column({
    type: DataType.STRING,
    field: 'login_otp',
  })
  loginOtp: string;

  @Column({
    type: DataType.STRING,
    field: 'otp_secret',
  })
  otpSecret: string;

  @Column({
    type: DataType.STRING,
    field: 'reset_password_otp',
  })
  resetPasswordOtp: string;

  @Column({
    type: DataType.STRING,
    field: 'profile_image',
  })
  profileImage: string;

  @Column({
    type: DataType.STRING,
    field: 'gender',
    values: ['male', 'female', 'unisex'],
  })
  gender: string;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

  @Column({
    type: DataType.STRING,
    field: 'type',
    defaultValue: 'customer',
  })
  type: 'customer' | 'supplier' | 'internal' ;

  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
    field: 'business_id',
  })
  businessId: number;

  @BelongsTo(() => Business, 'businessId')
  business: Business;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'created_by_id',
  })
  createdById: number;

  @BelongsTo(() => User, 'createdById')
  createdBy: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'updated_by_id',
  })
  updatedById: number;

  @BelongsTo(() => User, 'updatedById')
  updatedBy: User;

  @HasMany(() => UserRole, 'userId')
  roles: UserRole[];

  @BeforeCreate
  static async beforeCreateHook(user: User) {
    if (user.firstName || user.middleName || user.lastName) {
      user.name = `${user.firstName}${
        user.middleName ? ' ' + user.middleName : ''
      } ${user.lastName}`;
    }
    if (user.email) {
      user.email = user.email.trim().toLowerCase();
    }
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
  }
}
