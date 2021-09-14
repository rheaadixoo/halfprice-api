import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'businesses' })
export class Business extends Model<Business> {
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
    allowNull: true
  })
  name: string;
  
  @Column({
    type: DataType.TEXT,
    field: 'image',
    allowNull: true
  })
  image: string;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';
  
  @Column({
    type: DataType.STRING,
    field: 'description',
  })
  description: string;
    
  // @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'created_by_id',
  })
  createdById: number;

  // @BelongsTo(() => User, 'createdById')
  // createdBy: User;

  // @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'updated_by_id',
  })
  updatedById: number;

  // @BelongsTo(() => User, 'updatedById')
  // updatedBy: User;
}
