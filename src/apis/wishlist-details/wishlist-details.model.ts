import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Business } from '../business/business.model';
import { Cart } from '../cart/cart.model';
import { Invoice } from '../invoice/invoice.model';
import { Product } from '../product/product.model';
import { Wishlist } from '../wishlist/wishlist.model';

@Table({ tableName: 'wishlist_details' })
export class WishlistDetails extends Model<WishlistDetails> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @ForeignKey(() => Wishlist)
  @Column({
    type: DataType.INTEGER,
    field: 'wishlist_id',
  })
  wishlistId: number;

  @BelongsTo(() => Wishlist, 'wishlistId')
  wishlist: Wishlist;

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'open',
  })
  status: 'open' | 'confirmed' | 'in_progress' | 'cancelled' | 'completed';

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


  @ForeignKey(() => Invoice)
  @Column({
    type: DataType.INTEGER,
    field: 'invoice_id',
  })
  invoiceId: number;

  @BelongsTo(() => Invoice, 'invoiceId')
  invoice: Invoice;


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
