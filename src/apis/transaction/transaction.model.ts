import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Order } from '../order/order.model';
import { PaymentGateway } from '../payment-gateway/payment-gateway.model';

@Table({ tableName: 'transactions' })
export class Transaction extends Model<Transaction> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'pg_transaction_id',
  })
  pgTransactionId: string;

  @Column({
    type: DataType.DOUBLE,
    field: 'amount',
  })
  amount: number;

  @Column({
    type: DataType.DOUBLE,
    field: 'total_amount',
  })
  totalAmount: number;

  @Column({
    type: DataType.STRING,
    field: 'platform',
    defaultValue: 'WEB',
  })
  platform: 'WEB' | 'APP';

  @Column({
    type: DataType.JSONB,
    field: 'request_payload',
    allowNull: true,
  })
  requestPayload: any;

  @Column({
    type: DataType.JSONB,
    field: 'response_payload',
  })
  responsePayload: any;

  @Column({
    type: DataType.STRING,
    field: 'remarks',
  })
  remarks: string;

  @Column({
    type: DataType.STRING,
    field: 'transaction_status',
    defaultValue: 'TXN_INITIATED',
  })
  transactionStatus:
    | 'TXN_INITIATED'
    | 'TXN_SUCCESS'
    | 'TXN_PENDING'
    | 'TXN_FAILED';

    @Column({
      type: DataType.STRING,
      field: 'transaction_type',
      defaultValue: 'internal',
    })
    transactionType:
      | 'internal'
      | 'external'
      | 'manual';

  @Column({
    type: DataType.STRING,
    field: 'status',
    defaultValue: 'active',
  })
  status: 'active' | 'inactive';

  @Column({
    type: DataType.STRING,
    field: 'order_number',
  })
  orderNumber: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @BelongsTo(() => Order, 'orderId')
  order: Order;

  @ForeignKey(() => PaymentGateway)
  @Column({
    type: DataType.INTEGER,
    field: 'payment_gateway_id',
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
}
