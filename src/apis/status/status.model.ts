import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'statuses' })
export class Status extends Model<Status> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'name',
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: 'order_status',
    allowNull: false,
  })
  orderStatus: 'open' | 'confirmed' | 'in_progress' | 'cancelled' | 'completed';

  @Column({
    type: DataType.TEXT,
    field: 'icon',
    allowNull: false,
  })
  icon: string;

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
