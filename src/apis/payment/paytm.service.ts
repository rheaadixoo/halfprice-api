import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Paytm = require('paytm-pg-node-sdk');
import { PaytmCreateTransaction, PaytmInit } from './payment.type';

@Injectable()
export class PaytmService {
  constructor(private configService: ConfigService) {
    this.init();
  }

  private init(options?: PaytmInit) {
    const nodeEnv = this.configService.get('NODE_ENV');
    const environment =
      nodeEnv === (options && options.environment) ?? 'development'
        ? Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT
        : Paytm.LibraryConstants.STAGING_ENVIRONMENT;
    const mid = (options && options.mid) ?? this.configService.get('PAYTM_MID');
    const key = (options && options.key) ?? this.configService.get('PAYTM_KEY');
    const website =
      (options && options.website) ?? this.configService.get('PAYTM_WEBSITE');
    const callbackUrl =
      (options && options.callbackUrl) ??
      this.configService.get('PAYTM_CALLBACK_URL');
    Paytm.MerchantProperties.setCallbackUrl(callbackUrl);
    Paytm.MerchantProperties.initialize(environment, mid, key, website);
  }

  async createTransaction(
    transaction: PaytmCreateTransaction,
    options?: PaytmInit,
  ): Promise<any> {
    if (options) {
      this.init(options);
    }
    const channelId = Paytm.EChannelId.WEB;
    const orderId = transaction.orderId;
    const txnAmount = Paytm.Money.constructWithCurrencyAndValue(
      Paytm.EnumCurrency.INR,
      parseFloat(transaction.transactionAmount.toString()).toString(),
    );
    const userInfo = new Paytm.UserInfo(transaction.consumerId);
    userInfo.setAddress(transaction.address);
    userInfo.setEmail(transaction.email);
    userInfo.setFirstName(transaction.firstName);
    userInfo.setLastName(transaction.lastName);
    userInfo.setMobile(transaction.mobile);
    userInfo.setPincode(transaction.pinCode);
    const paymentDetailBuilder = new Paytm.PaymentDetailBuilder(
      channelId,
      orderId,
      txnAmount,
      userInfo,
    );
    const paymentDetail = paymentDetailBuilder.build();
    const response = await Paytm.Payment.createTxnToken(paymentDetail);
    return { request: paymentDetail, response: response };
  }

  async paymentStatus(orderId: string, timeout?: number): Promise<any> {
    const readTimeout =
      timeout ?? parseInt(this.configService.get('PAYTM_READ_TIMEOUT'));
    const paymentStatusDetailBuilder = new Paytm.PaymentStatusDetailBuilder(
      orderId,
    );
    const paymentStatusDetail = paymentStatusDetailBuilder
      .setReadTimeout(readTimeout)
      .build();
    return Paytm.Payment.getPaymentStatus(paymentStatusDetail);
  }
}
