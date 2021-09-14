import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';
import { Business } from '../business/business.model';

@Table({ tableName: 'addresses' })
export class Address extends Model<Address> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    field: 'registered_name',
  })
  registeredName: string;

  @Column({
    type: DataType.STRING,
    field: 'name',
  })
  name: string;

  @Column({
    type: DataType.STRING,
    field: 'lat',
  })
  lat: string;


  @Column({
    type: DataType.STRING,
    field: 'lng',
  })
  lng: string;

  @Column({
    type: DataType.STRING,
    field: 'gstin',
  })
  gstin: string;

  @Column({
    type: DataType.STRING,
    field: 'gstin_image',
  })
  gstinImage: string;

  @Column({
    type: DataType.STRING,
    field: 'pan_number',
  })
  panNumber: string;

  @Column({
    type: DataType.STRING,
    field: 'country',
    allowNull: false,
    defaultValue: 'India',
  })
  country: string;

  @Column({
    type: DataType.STRING,
    field: 'state',
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    field: 'city',
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    field: 'pin_code',
    allowNull: false,
  })
  pinCode: string;

  @Column({
    type: DataType.STRING,
    field: 'address',
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.BOOLEAN,
    field: 'default',
    defaultValue: false,
  })
  default: boolean;

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
    field: 'user_id',
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}
