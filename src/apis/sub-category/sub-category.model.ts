import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Category } from '../category/category.model';

@Table({ tableName: 'sub_categories' })
export class SubCategory extends Model<SubCategory> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.JSONB,
    field: 'banners',
  })
  banners: string[];

  @Column({
    type: DataType.STRING,
    field: 'icon',
  })
  icon: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
    field: 'status',
    allowNull: false,
  })
  status: 'active' | 'inactive';

  // @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'category_id',
    allowNull: false,
  })
  categoryId: number;

  // @BelongsTo(() => Category, 'categoryId')
  // category: Category;

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
