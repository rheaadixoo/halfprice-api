import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Business } from '../business/business.model';
import { SubCategory } from '../sub-category/sub-category.model';

@Table({ tableName: 'catelouges' })
export class Catelouge extends Model<Catelouge> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'name'
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: 'csv'
  })
  csv: string;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
    allowNull: false,
  })
  status: 'active' | 'inactive';

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_demo'
  })
  isDemo: boolean;
  
  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
    field: 'business_id',
  })
  businessId: number;

  @BelongsTo(() => Business, 'businessId')
  business: Business;
  
  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    field: 'sub_category_id',
  })
  subCategoryId: number;

  @BelongsTo(() => SubCategory, 'subCategoryId')
  subCategory: SubCategory;

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
