import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Order } from '../order/order.model';

@Table({ tableName: 'progresses' })
export class Progress extends Model<Progress> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    field: 'icon',
    defaultValue:
      'https://homefitt.s3.ap-south-1.amazonaws.com/1611251728976_choices.svg',
  })
  icon: string;

  @Column({
    type: DataType.JSONB,
    field: 'images',
    allowNull: true,
  })
  images: string[];

  @Column({
    type: DataType.STRING,
    field: 'progress',
    allowNull: false,
  })
  progress: string;

  @Column({
    type: DataType.TEXT,
    field: 'remarks',
    allowNull: true,
  })
  remarks: string;

  @Column({
    type: DataType.STRING,
    field: 'progressStatus',
    defaultValue: 'open',
  })
  progressStatus:
    | 'open'
    | 'confirmed'
    | 'in_progress'
    | 'cancelled'
    | 'completed';

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @BelongsTo(() => Order, 'orderId')
  order: Order;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

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
