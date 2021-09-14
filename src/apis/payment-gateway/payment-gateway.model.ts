import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'payment_gateways' })
export class PaymentGateway extends Model<PaymentGateway> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'pg_name',
    allowNull: false,
  })
  pgName: string;

  @Column({
    type: DataType.STRING,
    field: 'mid',
    allowNull: false,
  })
  mid: string;

  @Column({
    type: DataType.STRING,
    field: 'key',
    allowNull: false,
  })
  key: string;

  @Column({
    type: DataType.STRING,
    field: 'hash',
    allowNull: true,
  })
  hash: string;

  @Column({
    type: DataType.STRING,
    field: 'website',
    allowNull: false,
  })
  website: string;

  @Column({
    type: DataType.STRING,
    field: 'pg_url',
    allowNull: false,
  })
  pgUrl: string;

  @Column({
    type: DataType.STRING,
    field: 'cb_url',
    allowNull: false,
  })
  cbUrl: string;

  @Column({
    type: DataType.INTEGER,
    field: 'read_timeout',
    allowNull: false,
  })
  readTimeout: number;

  @Column({
    type: DataType.JSONB,
    field: 'account_info',
    allowNull: true,
  })
  accountInfo: any;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

  @Column({
    type: DataType.BOOLEAN,
    field: 'default',
    defaultValue: false,
  })
  default: boolean;

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
}
