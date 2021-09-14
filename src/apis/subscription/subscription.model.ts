import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'subscriptions' })
export class Subscription extends Model<Subscription> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

    
  @Column({
    type: DataType.STRING,
    field: 'schedule_type',
  })
  scheduleType: 'daily' | 'monthly' | 'weekly' | 'alt-days';

  @Column({
    type: DataType.JSONB,
    field: 'schedule_type',
  })
  scheduleDate: string[];

  @Column({
    type: DataType.STRING,
    field: 'time_slots',
  })
  timeSlot: 'morning' | 'noon' | 'evening' ;

  @Column({
    type: DataType.DOUBLE,
    field: 'total_amount',
    defaultValue: 0,
  })
  totalAmount: number;

  @Column({
    type: DataType.DATE,
    field: 'start_date',
  })
  startDate: string;

  @Column({
    type: DataType.DATE,
    field: 'end_date',
  })
  endDate: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
    allowNull: false,
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
