import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Brand } from '../brand/brand.model';
import { Business } from '../business/business.model';
import { Category } from '../category/category.model';
import { Color } from '../color/color.model';
import { SubCategory } from '../sub-category/sub-category.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
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
    field: 'sku',
    allowNull: false,
  })
  sku: string;

  @Column({
    type: DataType.TEXT,
    field: 'description',
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'price',
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'selling_price',
    allowNull: false,
  })
  sellingPrice: number;

  @Column({
    type: DataType.STRING,
    field: 'thumb_images',
    allowNull: true,
  })
  thumbImages: string;

  @Column({
    type: DataType.JSONB,
    field: 'images',
    allowNull: true,
  })
  images: string[];


  @Column({
    type: DataType.BOOLEAN,
    field: 'featured',
    defaultValue: false,
  })
  featured: boolean;
  
  @Column({
    type: DataType.STRING,
    field: 'hsn_code',
  })
  hsnCode: string;

  @Column({
    type: DataType.STRING,
    field: 'material_care',
  })
  materialCare: string;
  
  @Column({
    type: DataType.STRING,
    field: 'brand_name',
    allowNull: false,
  })
  brandName: string;

  @Column({
    type: DataType.JSONB,
    field: 'specifications',
    allowNull: true,
  })
  specifications: { key: string; value: any }[];

  @Column({
    type: DataType.INTEGER,
    field: 'available_stock',
    allowNull: false,
  })
  availableStock: number;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

  @Column({
    type: DataType.STRING,
    field: 'product_status',
    defaultValue: 'pending',
  })
  productStatus: 'pending' | 'approved' | 'rejected';


  // @ForeignKey(() => SubCategory)
  // @Column({
  //   type: DataType.INTEGER,
  //   field: 'sub_category_id',
  // })
  // subCategoryId: number;

  // @BelongsTo(() => SubCategory, 'subCategoryId')
  // subCategory: SubCategory;

  
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'category_id',
  })
  categoryId: number;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;


  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
    field: 'brand_id',
  })
  brandId: number;

  @BelongsTo(() => Brand, 'brandId')
  brand: Brand;

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
}
