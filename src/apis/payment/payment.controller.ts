import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Render,
  Query,
  Res,
  HttpCode,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Order } from '../order/order.model';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { PaymentTransactionResponse, PaytmTransactionResponse, PayUTransactionResponse } from './payment.type';
import { TransactionService } from '../transaction/transaction.service';

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private configService: ConfigService,
    private transactionService: TransactionService,
  ) {}

  @Post()
  async create(@Body(ValidationPipe) paymentDto: any, order: Order) {
    return this.paymentService.createTxnToken(paymentDto, order);
  }

  @Get('checkout')
  @Render('checkout')
  checkout(
    @Query('txnToken') txnToken: string,
    @Query('orderNumber') orderNumber: string,
    @Query('amount') amount: string,

  ) {
    return this.paymentService.checkout(orderNumber, txnToken,amount);
  }

  @Get('generate')
  generate(
    @Query('orderId') orderId: any,
    @Query('amount') amount: any,

  ) {
    return this.paymentService.generateUrl(orderId,amount);
  }

  @Get('pay')
  @Render('pay')
  pay(
    @Query('i') id: string,
    @Query('a') amount: string,

  ) {
    return this.paymentService.pay(id,amount);
  }

  @Get('success')
  @Render('success')
  success(
    @Query('txnToken') txnToken: string,
    @Query('orderNumber') orderNumber: string,
    @Query('amount') amount: string,


  ) {
    return this.paymentService.handleExternalStatus(txnToken,orderNumber,amount,'success');

  }
  @Get('pending')
  @Render('pending')
  pending(
    @Query('txnToken') txnToken: string,
    @Query('orderNumber') orderNumber: string,
    @Query('amount') amount: string,


  ) {
    return this.paymentService.handleExternalStatus(txnToken,orderNumber,amount,'pending');

  }

  @Get('failed')
  @Render('failed')
  failed(
    @Query('txnToken') txnToken: string,
    @Query('orderNumber') orderNumber: string,
    @Query('amount') amount: string,


  ) {
    return this.paymentService.handleExternalStatus(txnToken,orderNumber,amount,'failed');

  }

  @Post('make-payment')
  makePayment(  
    @Body() paymentDetails: {txnToken:string ,  orderNumber: string, amount:number},
    @Res() res:Response
  ) {
    // return this.paymentService.makePayment(paymentDetails );
  //  const newOrderNumber = paymentDetails.orderNumber.split('_')[0]
    res.redirect(`/v1/payments/checkout?txnToken=${paymentDetails.txnToken}&orderNumber=${paymentDetails.orderNumber}&amount=${paymentDetails.amount}`)
  }

  @Post('status')
  @HttpCode(200)
  async paymentStatus(
    @Body() transactionResponse: PaymentTransactionResponse,
    @Res() res: Response,
  ) {
    return this.paymentService.paymentStatus(transactionResponse, res);
  }


}
