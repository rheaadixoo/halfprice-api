import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Order } from '../order/order.model';

@Table({ tableName: 'deliveries' })
export class Delivery extends Model<Delivery> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  
  @Column({
    type: DataType.JSONB,
    field: 'pickup_location',
    allowNull: true,
  })
  pickupLocation: any;
   
  @Column({
    type: DataType.JSONB,
    field: 'check_couirer_service_avalabilty',
    allowNull: true,
  })
  checkCouirerServiceAvalabilty: any;

  @Column({
    type: DataType.JSONB,
    field: 'generated_awb',
    allowNull: true,
  })
  generatedAWB: any;

  @Column({
    type: DataType.JSONB,
    field: 'generated_manifest',
    allowNull: true,
  })
  generatedManifest: any;

  @Column({
    type: DataType.JSONB,
    field: 'generated_shipment_label',
    allowNull: true,
  })
  generatedShipmentLabel: any;

  @Column({
    type: DataType.JSONB,
    field: 'custom_order',
    allowNull: true,
  })
  customOrder: any;

  @Column({
    type: DataType.STRING,
    field: 'ship_rocket_order_id',
  })
  shipRocketOrderId: string;

  @Column({
    type: DataType.STRING,
    field: 'shipment_id',
  })
  shipmentId: string;


  @Column({
    type: DataType.STRING,
    field: 'status',
  })
  status: string;

  @Column({
    type: DataType.STRING,
    field: 'awb_code',
  })
  awbCode: string;

  @Column({
    type: DataType.STRING,
    field: 'shippment_url',
  })
  shippmentUrl: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @BelongsTo(() => Order, 'orderId')
  order: Order;

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
