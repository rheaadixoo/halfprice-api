import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand> {
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
    field: 'description',
  })
  description: string;



  @Column({
    type: DataType.STRING,
    field: 'image',
  })
  image: string;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
    allowNull: false,
  })
  status: 'active' | 'inactive';

    
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
