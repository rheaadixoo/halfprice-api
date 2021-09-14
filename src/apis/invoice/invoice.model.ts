import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import * as uniqid from 'uniqid';
import { Business } from '../business/business.model';
import { Cart } from '../cart/cart.model';

@Table({ tableName: 'invoices' })
export class Invoice extends Model<Invoice> {
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
    defaultValue: 'none',
  })
  status: 'un-paid' | 'paid' ;

    
  @Column({
    type: DataType.STRING,
    field: 'invoice_url',
  })
  invoiceUrl: string ;

  @Column({
    type: DataType.DATE,
    field: 'invoice_date',
    defaultValue: Date.now()
  })
  invoiceDate: string ;

  @Column({
    type: DataType.STRING,
    field: 'invoice_number'
  })
  invoiceNumber: string ;

  @Column({
    type: DataType.JSONB,
    field: 'invoice_items'
  })
  invoiceItems: any[] ;
    
  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
    field: 'business_id',
  })
  businessId: number;

  @BelongsTo(() => Business, 'businessId')
  business: Business;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    field: 'cart_id',
    allowNull: true,
  })
  cartId: number;

  @BelongsTo(() => Cart, 'cartId')
  cart : Cart;

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

  @BeforeCreate
  static async beforeCreateHook(invoice: Invoice) {
    invoice.invoiceNumber = uniqid('YI-').toUpperCase();
  }
}
