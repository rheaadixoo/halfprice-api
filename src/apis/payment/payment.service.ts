import {
  forwardRef,
  HttpService,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Order } from '../order/order.model';
import { PaymentGatewayService } from '../payment-gateway/payment-gateway.service';
import { TransactionService } from '../transaction/transaction.service';
import {
  PaymentTransactionResponse,
  PaytmCreateTransaction,
  PaytmTransactionResponse,
  PayUTransactionResponse,
} from './payment.type';
import { PaytmService } from './paytm.service';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { OrderService } from '../order/order.service';
import { CanNotificationSendOptions, CanNotificationService } from '@can/notification';
import { UserService } from 'src/core/user/user.service';
import { User } from 'src/core/user/user.model';
import { AddressService } from '../address/address.service';
import { PaymentGateway } from '../payment-gateway/payment-gateway.model';
import { ProgressService } from '../progress/progress.service';
import { StatusService } from '../status/status.service';
import * as moment from 'moment';

const TinyUrl = require('tinyurl');
const CryptoJS = require("crypto-js");
const crypto = require('crypto');
@Injectable()
export class PaymentService {
  constructor(
    private paytmService: PaytmService,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService,
    private paymentGatewayService: PaymentGatewayService,
    private configService: ConfigService,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private notificationService: CanNotificationService,
    private userService: UserService,
    private addressService: AddressService,
    @Inject(forwardRef(() => ProgressService))
    private progressService : ProgressService,
    private statusService : StatusService,
    private httpService: HttpService

  ) { }

  async createTxnToken(
    transaction: PaytmCreateTransaction,
    order: Order,
    type?: string
  ): Promise<any> {
    let foundPaymentGateway = await this.paymentGatewayService.findById(
      order.paymentGatewayId,
    );
    if (
      !foundPaymentGateway
    ) {
      const paymentGateway = await this.paymentGatewayService.findAll({ where: { default: true } })

      if (paymentGateway && paymentGateway.length) {
        foundPaymentGateway = paymentGateway[0]
      } else {
        throw new UnprocessableEntityException(
          'Payment Gateway is required in order to process order',
        );
      }
    }
    if (this.isPaytmGateway(foundPaymentGateway.pgName)) {

      const { request, response } = await this.paytmService.createTransaction(
        transaction,
        {
          environment: 'development',
          callbackUrl: foundPaymentGateway.cbUrl,
          key: foundPaymentGateway.key,
          mid: foundPaymentGateway.key,
          website: foundPaymentGateway.website,
        },
      );
      const transactionData = {
        totalAmount: order.totalAmount,
        amount: transaction.transactionAmount,
        orderId: order.id,
        orderNumber: transaction.orderId,
        requestPayload: request,
        paymentGatewayId: foundPaymentGateway.id,
        pgTransactionId: '',
      }
      if (type && type == 'external') {
        transactionData['transactionType'] = type;
      }
      const trn = await this.transactionService.create(transactionData);
      if (foundPaymentGateway.pgName.toLowerCase() == 'paytm') {
        const { txnToken } = response.responseObject.body;
        return txnToken;
      }
      if (foundPaymentGateway.pgName.toLowerCase() == 'payu') {
        const key = this.configService.get('PAYU_KEY');
        const salt = this.configService.get('PAYU_SALT');
        const user = await this.userService.findById(order.userId)
        // const newOrderNumber = `${order.orderNumber}_${order.txnCount}`;
        const newOrderNumber =type && type == 'external'? `${order.orderNumber}_${order.txnCount + 1}`:`${order.orderNumber}_${order.txnCount}`;

        return this.generateHash(key, salt, transaction.transactionAmount, user, newOrderNumber)
      }
    }
    return;
  }

  getPaytmPayment(newOrderNumber, txnToken) {

    const mid = this.configService.get('PAYTM_MID');
    const action = `${this.configService
      .get('PAYTM_PAYMENT_URL')
      .trim()}?mid=${mid}&orderId=${newOrderNumber}`;
    return { paytm: true, mid, orderId: newOrderNumber, txnToken, action };
  }

  getPayUPayment(foundOrders, paymentGateway, user, newOrderNumber, txnToken, amount) {


    const key = this.configService.get('PAYU_KEY');
    const salt = this.configService.get('PAYU_SALT');
    const surl = paymentGateway.cbUrl;
    const furl = paymentGateway.cbUrl;
    const finalAmount = amount ? amount : foundOrders[0].totalAmount;
    // const orderNumber = amount ? foundOrders[0].orderNumber + "_" + (foundOrders[0].txnCount - 1) : newOrderNumber
    // const hash =  this.generateHash(key,salt,foundOrders[0].totalAmount,user,newOrderNumber)
    const orderNumber = amount ? `${foundOrders[0].orderNumber}_${foundOrders[0].txnCount}` : newOrderNumber

    const action = `${this.configService
      .get('PAYU_URL')
      .trim()}`

    return {
      payU: true,
      hash: txnToken,
      action,
      surl,
      furl,
      key,
      salt,
      amount: finalAmount,
      orderNumber,
      name: user.name,
      email: user.email,
      number: user.mobile
    };

  }

  async checkout(orderNumber: string, txnToken: string, amount?: any) {
    const foundOrders = await this.orderService.findAll({
      where: { orderNumber },
      include: [{ model: PaymentGateway }]
    });
    if (!foundOrders.length) {
      throw new UnprocessableEntityException('Order number is not valid');
    }
    const user = await this.userService.findById(foundOrders[0].userId)
    const newOrderNumber = `${foundOrders[0].orderNumber}_${foundOrders[0].txnCount}`;
    // const newOrderNumber = orderNumber;

    let response, paymentGateway;
    if (foundOrders[0].paymentGateway) {
      paymentGateway = foundOrders[0].paymentGateway
    } else {
      const pg = await this.paymentGatewayService.findAll({ where: { default: true } })
      paymentGateway = pg[0];
    }
    switch (paymentGateway.pgName) {
      case 'Paytm':
        response = this.getPaytmPayment(newOrderNumber, txnToken);
        break;
      case 'PayU':
        response = this.getPayUPayment(foundOrders, paymentGateway, user, newOrderNumber, txnToken, amount);
        break;
      default:
        break;
    }

    return response;

  }

  generateHash(key, salt, amount, user, newOrderNumber) {
    const cryp = crypto.createHash('sha512');
    const hashString = key + '|' + newOrderNumber + '|' + amount + '|' + newOrderNumber + '|' + user.name + '|' + user.email + '|||||||||||' + salt

    cryp.update(hashString);
    return cryp.digest('hex');
  }

  async generateUrl(orderId: any, orderAmount: number) {

    const id = (typeof orderId == 'string') ? this.encryptData(parseInt(orderId)) : this.encryptData(orderId)
    const order = await this.orderService.findById(orderId)
    let url;
    if (orderAmount) {
      const amount = (typeof orderAmount == 'string') ? this.encryptData(parseInt(orderAmount)) : this.encryptData(orderAmount)
      url = await this.getPaymentUrl(id, amount);
    } else {
      url =await this.getPaymentUrl(id);
      const paidAmount = await this.transactionService.sumOfSuccessTxn(orderId)
      orderAmount = order.totalAmount - paidAmount
    }
    const user = await this.userService.findById(order.userId);
    // const shortUrl = await TinyUrl.shorten(url)
    await this.notificationService.sendNotification({
      category: 'Payment',
      trigger: 'PAYMENT_LINK',
      data: {
        firstName: user.firstName,
        url,
        orderNumber:order.orderNumber,
        orderAmount
      },
      email: {
        to: [user.email],
      },
      sms: {
        mobile: user.mobile
      }
    });

    return { message: 'payment link generated successfully!' }
  }

  async pay(id: string, amount: any) {
    id = id.split(' ').join('+')
    amount = amount ? amount.split(' ').join('+') : 0
    const orderId = this.decryptData(id)
    const order = await this.orderService.findById(orderId)
    const user = await this.userService.findById(order.userId)
    const foundAddress = await this.addressService.findById(order.addressId)
    const totalAmount = amount ? this.decryptData(amount) : 0;
    // const transactions = await this.transactionService.findAll({ where: { orderId: orderId, transactionStatus: 'TXN_SUCCESS' } })
    // let paidAmount = 0
    // for (let index = 0; index < transactions.length; index++) {
    //   paidAmount += transactions[index].amount;
    // }
    const paidAmount = await this.transactionService.sumOfSuccessTxn(orderId)
    const finalAmount = totalAmount ? totalAmount : order.totalAmount - paidAmount
    //  order.totalAmount = finalAmount
    const transaction: PaytmCreateTransaction = {
      consumerId: order.userId.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      pinCode: foundAddress.pinCode,
      address: foundAddress.address,
      orderId: order.orderNumber + '_' + (order.txnCount + 1),
      transactionAmount: finalAmount,
    }
    const txnToken = await this.createTxnToken(transaction, order, 'external')
    await this.orderService.updateById(order.id, { txnCount: order.txnCount + 1 });

    const action = `make-payment`
    const webUrl = this.configService.get(
      'WEB_URL',
    );
    return { orderNumber: order.orderNumber, totalAmount: order.totalAmount.toLocaleString('en'),paidAmount: paidAmount.toLocaleString('en'), amount: finalAmount,viewAmount: parseInt(finalAmount).toLocaleString('en'), txnToken, action, url: webUrl }
  }

  async makePayment(paymentDetails: any) {
    return this.checkout(paymentDetails.orderNumber, paymentDetails.txnToken)
  }
  async paymentStatus(
    transactionResponse: PaymentTransactionResponse,
    res: Response,
  ) {
    if (transactionResponse.hasOwnProperty('MID')) {
      this.paytmPaymentStatus(transactionResponse, res)
    } else {
      this.payUPaymentStatus(transactionResponse, res)
    }
  }

  async paytmPaymentStatus(
    transactionResponse: PaytmTransactionResponse,
    res: Response,
    cron?:boolean
  ) {
    const foundTransaction = await this.transactionService.findAll({
      where: { orderNumber: transactionResponse.ORDERID },
      include: [{ model: Order }]
    });
    const user = await this.userService.findById(foundTransaction[0].order.userId)
    switch (transactionResponse.STATUS) {
      case 'TXN_SUCCESS':
        if (foundTransaction && foundTransaction.length) {
          const resp = await this.transactionService.updateById(foundTransaction[0].id, {
            responsePayload: transactionResponse,
            pgTransactionId: transactionResponse.TXNID,
            transactionStatus: 'TXN_SUCCESS',
          });
          await  this.onPaymentSuccess(foundTransaction,transactionResponse , user,res)
          if(cron) return true;
          if (foundTransaction[0].transactionType == 'external') {
            return this.handleExternalTransaction(
              transactionResponse.ORDERID,
              transactionResponse.TXNID,
              transactionResponse.TXNAMOUNT,
              'success',
              res,
              )
            }
            
          return this.handleStatus(
            transactionResponse.ORDERID,
            transactionResponse.TXNID,
            'success',
            res,
          );
        } else {
          return this.handleStatus(
            transactionResponse.ORDERID,
            transactionResponse.TXNID,
            'failed',
            res,
          );
        }
        break;
      case 'TXN_PENDING':
        if (foundTransaction && foundTransaction.length) {
          this.transactionService.updateById(foundTransaction[0].id, {
            responsePayload: transactionResponse,
            pgTransactionId: transactionResponse.TXNID,
            transactionStatus: 'TXN_PENDING',
          });
          if(cron) return true;
          if (foundTransaction[0].transactionType == 'external') {
            return this.handleExternalTransaction(
              transactionResponse.ORDERID,
              transactionResponse.TXNID,
              transactionResponse.TXNAMOUNT,
              'pending',
              res,
            )
          }
          return this.handleStatus(
            transactionResponse.ORDERID,
            transactionResponse.TXNID,
            'pending',
            res,
          );
        } else {
          return this.handleStatus(
            transactionResponse.ORDERID,
            transactionResponse.TXNID,
            'failed',
            res,
          );
        }
      case 'TXN_FAILURE':
      default:
        if (foundTransaction && foundTransaction.length) {
          this.transactionService.updateById(foundTransaction[0].id, {
            responsePayload: transactionResponse,
            pgTransactionId: transactionResponse.TXNID,
            transactionStatus: 'TXN_FAILURE',
          });
          if(cron) return true;
          if (foundTransaction[0].transactionType == 'external') {
            return this.handleExternalTransaction(
              transactionResponse.ORDERID,
              transactionResponse.TXNID,
              transactionResponse.TXNAMOUNT,
              'failed',
              res,
            )
          }
          return this.handleStatus(
            transactionResponse.ORDERID,
            transactionResponse.TXNID,
            'failed',
            res,
          );
        } else {
          return this.handleStatus(
            transactionResponse.ORDERID,
            transactionResponse.TXNID,
            'failed',
            res,
          );
        }
    }
  }

  async payUPaymentStatus(
    transactionResponse: PayUTransactionResponse,
    res: Response,
    cron?:boolean
  ) {
    // const orderNumber = transactionResponse.txnid.split("_")[0]
    const foundTransaction = await this.transactionService.findAll({
      where: { orderNumber: transactionResponse.txnid },
      include: [{ model: Order }]
    });
    const user = await this.userService.findById(foundTransaction[0].order.userId)

    switch (transactionResponse.status) {
      case 'success':
        if (foundTransaction && foundTransaction.length) {
          this.transactionService.updateById(foundTransaction[0].id, {
            responsePayload: transactionResponse,
            pgTransactionId: transactionResponse.hash,
            transactionStatus: 'TXN_SUCCESS',
          });
          await  this.onPaymentSuccess(foundTransaction,transactionResponse , user,res)
          if(cron) return true;
          if (foundTransaction[0].transactionType == 'external') {
            return this.handleExternalTransaction(
              transactionResponse.txnid,
              transactionResponse.hash,
              transactionResponse.amount,
              'success',
              res,
              )
            }
            
          return this.handleStatus(
            transactionResponse.txnid,
            transactionResponse.hash,
            'success',
            res,
          );
        } else {
          return this.handleStatus(
            transactionResponse.txnid,
            transactionResponse.hash,
            'success',
            res,
          );
        }
      break;
      case 'pending':
        if (foundTransaction && foundTransaction.length) {
          this.transactionService.updateById(foundTransaction[0].id, {
            responsePayload: transactionResponse,
            pgTransactionId: transactionResponse.hash,
            transactionStatus: 'TXN_PENDING',
          });
          if(cron) return true;
          if (foundTransaction[0].transactionType == 'external') {
            return this.handleExternalTransaction(
              transactionResponse.txnid,
              transactionResponse.hash,
              transactionResponse.amount,
              'pending',
              res,
            )
          }
          return this.handleStatus(
            transactionResponse.txnid,
            transactionResponse.hash,
            'pending',
            res,
          );
        } else {
          return this.handleStatus(
            transactionResponse.txnid,
            transactionResponse.hash,
            'failed',
            res,
          );
        }
      case 'failed':
      default:
        if (foundTransaction && foundTransaction.length) {
          this.transactionService.updateById(foundTransaction[0].id, {
            responsePayload: transactionResponse,
            pgTransactionId: transactionResponse.hash,
            transactionStatus: 'TXN_FAILURE',
          });
          if(cron) return true;
          if (foundTransaction[0].transactionType == 'external') {
            return this.handleExternalTransaction(
              transactionResponse.txnid,
              transactionResponse.hash,
              transactionResponse.amount,
              'failed',
              res,
            )
          }

          return this.handleStatus(
            transactionResponse.txnid,
            transactionResponse.hash,
            'failed',
            res,
          );
        } else {
          return this.handleStatus(
            transactionResponse.txnid,
            transactionResponse.hash,
            'success',
            res,
          );
        }
    }
  }

  async handleExternalStatus(transactionToken: any, decrpytOrderNumber: any, totalAmount: any, status: string) {
    const decrptyAmount = totalAmount.split(' ').join('+')
    const amount = this.decryptData(decrptyAmount)
    const webUrl = this.configService.get(
      'WEB_URL',
    );
    switch (status) {
      case 'failed':
        const orderNumber = decrpytOrderNumber.split('_')[0]
        const order = await this.orderService.findAll({ where: { orderNumber: orderNumber } })
        const paidAmount = await this.transactionService.sumOfSuccessTxn(order[0].id)

        const foundOrders = await this.orderService.findAll({
          where: { orderNumber },
        });
        if (!foundOrders.length) {
          throw new UnprocessableEntityException('Order number is not valid');
        }
        const user = await this.userService.findById(foundOrders[0].userId)
        const newOrderNumber = `${foundOrders[0].orderNumber}_${foundOrders[0].txnCount + 1}`;
        const foundAddress = await this.addressService.findById(foundOrders[0].addressId)

        const transaction: PaytmCreateTransaction = {
          consumerId: foundOrders[0].userId.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobile: user.mobile,
          pinCode: foundAddress.pinCode,
          address: foundAddress.address,
          orderId: newOrderNumber,
          transactionAmount: amount,
        }
        const txnToken = await this.createTxnToken(transaction, foundOrders[0], 'external')

        await this.orderService.updateById(foundOrders[0].id, { txnCount: foundOrders[0].txnCount + 1 });

        const action = `make-payment`

        return { txnToken, transactionToken, orderNumber, amount, url: webUrl, totalAmount: amount + paidAmount, paidAmount: paidAmount, action }

      default:
        let oldOrderNumber = decrpytOrderNumber.split('_')[0]

        return { txnToken: transactionToken, orderNumber: oldOrderNumber, amount, url: webUrl }

    }
  }

  private async onPaymentSuccess(foundTransaction,transactionResponse ,user, res){
    const data = {
      firstName: user.firstName,
      orderNumber: foundTransaction[0].orderNumber.split('_')[0],
      amount: foundTransaction[0].amount,
      whatsappData:[{
        default:foundTransaction[0].amount.toString()
      },{
        default:foundTransaction[0].orderNumber.split('_')[0]
      }]
    }

    await this.notificationService.sendNotification({
      category: 'Payment',
      trigger: 'PAYMENT_SUCCESS',
      data,
      email: {
        to: [user.email],
      }
    });
    
    const orderPaymentStatus =  await this.updateOrderPaymentStatus(foundTransaction[0]);
    this.orderService.updateById(foundTransaction[0].orderId, {paymentStatus : orderPaymentStatus});
    const status = await this.getStatus();
    const orderProgress:any = {
      orderId: foundTransaction[0].orderId,
      progress: 'Payment Received',
      userId: user.id,
      remarks:`Thank you! We have received your payment of ₹${foundTransaction[0].amount.toLocaleString('en')}`,
      progressStatus:status['orderStatus'],
      icon:status['icon']
    }
    return this.progressService.create(orderProgress)
  }

  public async updateOrderPaymentStatus(foundTransaction){
    const order = await this.orderService.findById(foundTransaction.orderId)
    const txnAmount = await this.transactionService.sumOfSuccessTxn(order.id)
    if(order.totalAmount > txnAmount){
      return 'partial';
    }else if( txnAmount >=  order.totalAmount){
      return 'full';
    }
  }
  public async getStatus(){
    const statues = await this.statusService.findAll({})
    for (let index = 0; index < statues.length; index++) {
      if(statues[index]['name'].toLowerCase() === 'payment received') return statues[index];
      
    }
  }


  private handleExternalTransaction(
    orderId: string,
    txnId: string,
    totalAmount: string,
    status: 'success' | 'pending' | 'failed',
    res: Response,
  ) {
    // const txnId = typeof transactionId == 'string'?this.encryptData(parseInt(transactionId)):this.encryptData(transactionId)
    // const orderId = this.encryptData(id)
    const amount = typeof totalAmount == 'string' ? this.encryptData(parseFloat(totalAmount)) : this.encryptData(totalAmount)
    switch (status) {
      case 'success':
        res.redirect(`/v1/payments/success?txnToken=${txnId}&orderNumber=${orderId}&amount=${amount}`)
        break;
      case 'pending':
        res.redirect(`/v1/payments/pending?txnToken=${txnId}&orderNumber=${orderId}&amount=${amount}`)
        break;
      case 'failed':
        res.redirect(`/v1/payments/failed?txnToken=${txnId}&orderNumber=${orderId}&amount=${amount}`)
        break;
      default:
        break;
    }
  }
  private handleStatus(
    orderId: string,
    txnId: string,
    status: 'success' | 'pending' | 'failed',
    res: Response,
  ) {
    res.redirect(this.getRedirectUrl(status, orderId.split('_')[0], txnId));
  }

  private getRedirectUrl(
    status: 'success' | 'pending' | 'failed',
    bookingId: string,
    txnId: string,
  ) {
    const browserCallbackHost = this.configService.get(
      'BROWSER_PAYMENT_CALLBACK_HOST',
    );
    return `${browserCallbackHost}?status=${status}&bookingId=${bookingId}&txnId=${txnId}`;
  }

  private isPaytmGateway(pgName: string): boolean {
    return pgName.match(new RegExp(/paytm/i)) || pgName.match(new RegExp(/payu/i)) ? true : false;
  }

  private getPaymentUrl(id: string, amount?: string) {
    const platformUrl = this.configService.get(
      'PLATFORM_URL',
    );
       // Generating Shortlink
      //  const shortLink = await TinyUrl.shorten(url);
    return amount ? TinyUrl.shorten(`${platformUrl}/payments/pay?i=${id}&a=${amount}`) : TinyUrl.shorten(`${platformUrl}/payments/pay?i=${id}`);
  }



  private encryptData(data) {
    const IV = this.configService.get('IV');
    const KEY = this.configService.get('KEY')

    const encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encryptedString.toString();
  }

  private decryptData(encrypted) {
    const IV = this.configService.get('IV');
    const KEY = this.configService.get('KEY')
    var decrypted = CryptoJS.AES.decrypt(encrypted, KEY, {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
  }


}
