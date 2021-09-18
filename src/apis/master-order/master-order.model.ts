import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Address } from '../address/address.model';
import { Business } from '../business/business.model';
import { Cart } from '../cart/cart.model';
import { PaymentGateway } from '../payment-gateway/payment-gateway.model';
import * as uniqid from 'uniqid';


@Table({ tableName: 'master_orders' })
export class MasterOrder extends Model<MasterOrder> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
 
  @Column({
    type: DataType.STRING,
    field: 'order_number',
  })
  orderNumber: string;

  @Column({
    type: DataType.DATE,
    field: 'estimated_completion_date',
  })
  estimatedCompletionDate: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'total_amount',
    defaultValue: 0,
  })
  totalAmount: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'item_amount',
    defaultValue: 0,
  })
  itemAmount: number;


  @Column({
    type: DataType.BOOLEAN,
    field: 'pay_later',
    defaultValue: false,
  })
  payLater: boolean;

  @Column({
    type: DataType.INTEGER,
    field: 'txn_count',
    defaultValue: 1,
  })
  txnCount: number;


  @Column({
    type: DataType.STRING,
    field: 'payment_status',
    defaultValue: 'none',
  })
  paymentStatus: 'none' | 'booking' | 'partial' | 'full';

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'open',
  })
  status: 'open' | 'confirmed' | 'in_progress' | 'cancelled' | 'completed';

  @Column({
    type: DataType.BOOLEAN,
    field: 'is_accepted',
    defaultValue: false,
  })
  isAccepted: boolean;

  @Column({
    type: DataType.INTEGER,
    field: 'shipping_order_id'
  })
  shippingOrderId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'shipment_id'
  })
  shipmentId: number;

  @ForeignKey(() => Business)
  @Column({
    type: DataType.INTEGER,
    field: 'business_id',
  })
  businessId: number;

  @BelongsTo(() => Business, 'businessId')
  business: Business;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    field: 'address_id',
    allowNull: true,
  })
  addressId: number;

  @BelongsTo(() => Address, 'addressId')
  address : Address;

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
    field: 'user_id',
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'representative_id',
    allowNull: true,
  })
  representativeId: number;

  @BelongsTo(() => User, 'representativeId')
  representative: User;

  @ForeignKey(() => PaymentGateway)
  @Column({
    type: DataType.INTEGER,
    field: 'payment_gateway_id',
    allowNull: true,
  })
  paymentGatewayId: number;

  @BelongsTo(() => PaymentGateway, 'paymentGatewayId')
  paymentGateway: PaymentGateway;

  

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
  static async beforeCreateHook(order: MasterOrder) {
    order.orderNumber = uniqid('HLP-').toUpperCase();
  }
}
