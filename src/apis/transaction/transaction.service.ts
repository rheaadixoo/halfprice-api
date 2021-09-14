import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { TRANSACTION_REPOSITORY } from './transaction.repository';
import { Transaction } from './transaction.model';
import { TransactionDto } from './transaction.dto';
import { FindOptions, CountOptions } from 'sequelize/types';
import { OrderService } from '../order/order.service';
import { CanNotificationService } from '@can/notification';
import { UserService } from 'src/core/user/user.service';
import { PaymentService } from '../payment/payment.service';
import { ProgressService } from '../progress/progress.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: typeof Transaction,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private notificationService: CanNotificationService,
    private userService : UserService,
    @Inject(forwardRef(() => PaymentService))
    private paymentService : PaymentService,
    @Inject(forwardRef(() => ProgressService))
    private progressService: ProgressService


  ) {}

  async create(transaction: Partial<TransactionDto>): Promise<Transaction> {
    const createdTransaction = await this.transactionRepository.create<Transaction>(transaction);
    if(transaction && transaction.transactionType && transaction.transactionType == 'manual' && transaction.orderId){
      const order = await this.orderService.findById(transaction.orderId)
      transaction.orderNumber =  order.orderNumber +"_"+ (order.txnCount+1);
      await this.orderService.updateById(order.id, { txnCount: order.txnCount + 1 });
      const user = await this.userService.findById(order.userId)
      const orderPaymentStatus =  await this.paymentService.updateOrderPaymentStatus(createdTransaction);
    this.orderService.updateById(transaction.orderId, {paymentStatus : orderPaymentStatus});
    const status = await this.paymentService.getStatus();
    const orderProgress:any = {
      orderId: transaction.orderId,
      progress: 'Payment Received',
      userId: order.userId,
      remarks:`Thank you! We have received your payment of ₹${transaction.amount.toLocaleString('en')}`,
      progressStatus:status['orderStatus'],
      icon:status['icon']
    }
     this.progressService.create(orderProgress)


      await this.notificationService.sendNotification({
        category: 'Payment',
        trigger: 'PAYMENT_SUCCESS_OFFLINE_NEW',
        data:{
          orderNumber : order.orderNumber,
          amount : transaction.amount,
          whatsappData:[{
            default:transaction.amount.toLocaleString('en')
          },
          {
            default:order.orderNumber
          }
        ]
        },
        sms :{
          mobile : user.mobile
        },
        whatsapp:{
          mobile:user.mobile
        }
      });
    }
    return createdTransaction;
  }

  async findAll(filter: FindOptions) {
    return this.transactionRepository.findAll(filter);
    
  }
 
  async sumOfSuccessTxn(orderId:number){
   return this.transactionRepository.sum('amount',{where:{orderId, transactionStatus : 'TXN_SUCCESS'}})
  }

  async findById(id: number): Promise<Transaction> {
    return this.transactionRepository.findByPk(id);
  }

  async count(filter: CountOptions) {
    const totalCount = await this.transactionRepository.count(filter);
    return { count: totalCount };
  }

  async updateById(id: number, data: any) {
    return this.transactionRepository.update(data, { where: { id } });
  }

  async upsert(data: object) {
    return this.transactionRepository.upsert(data);
  }
}
