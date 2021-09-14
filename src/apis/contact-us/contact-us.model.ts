import { Table, Model, Column, DataType, ForeignKey, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import { User } from 'src/core/user/user.model';

@Table({ tableName: 'contact_us' })
export class ContactUs extends Model<ContactUs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;
  


  @Column({
    type: DataType.STRING,
    field: 'full_name',
    allowNull: true,
  })
  fullName: string;


  @Column({
    type: DataType.STRING,
    field: 'email',
    allowNull: true
  })
  email: string;

  @Column({
    type: DataType.STRING,
    field: 'subject',
    allowNull: true,
  })
  subject: string;
    
  @Column({
    type: DataType.TEXT,
    field: 'message',
    allowNull: true,
  })
  message: string;

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
  static async beforeCreateHook(user: ContactUs) {
    if (user.email) {
      user.email = user.email.trim().toLowerCase();
    }
  }
}
