import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Product } from '../product/product.model';

@Table({ tableName: 'colors' })
export class Color extends Model<Color> {
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
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: 'hex',
    allowNull: false,
  })
  hex: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @BelongsTo(() => Product, 'productId')
  product: Product;
    
  @Column({
    type: DataType.INTEGER,
    field: 'quantity',
  })
  quantity: number;


  @Column({
    type: DataType.JSONB,
    field: 'images',
    allowNull: true,
  })
  images: string[];
  
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
