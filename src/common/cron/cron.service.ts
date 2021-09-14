import { HttpService, Injectable, Res } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op } from 'sequelize';
import { PaymentGateway } from 'src/apis/payment-gateway/payment-gateway.model';
import * as moment from 'moment';
import { TransactionService } from 'src/apis/transaction/transaction.service';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from 'src/apis/payment/payment.service';
import { Response } from 'express';
const CryptoJS = require("crypto-js");
const crypto = require('crypto');
const PaytmChecksum = require('paytmchecksum');
@Injectable()
export class CronService {

    
    constructor(
      private transactionService: TransactionService,
      private configService: ConfigService,
      private httpService: HttpService,
      private paymentService:PaymentService
    ){

    }
  @Cron(CronExpression.EVERY_MINUTE)
  runEveryMinute(): void {
    console.log('Running Every Minute');

  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  
  runEveryFiveMinute(): void{
    console.log("Runing Every Five Minute");
    this.reconcilePayment()
  }

 
  async reconcilePayment() {
    const today = moment();
    const minDate = new Date(
      today.minute(today.minute() - 5).toISOString(),
    ).toISOString();
    const pendingTransactionFindQuery = {
      where: {
        createdAt: { [Op.lte]: minDate },
        transactionStatus: 'TXN_PENDING' ,
      },
      include: [{ model: PaymentGateway }]

    };
    const transactions = await this.transactionService.findAll(pendingTransactionFindQuery)
    for (let index = 0; index < transactions.length; index++) {
      const cancelledDate = moment(moment(minDate).subtract(30, 'minutes')).toISOString()
      if(cancelledDate < moment(transactions[index].createdAt).toISOString()){

        if(transactions[index]['paymentGateway']['pgName'].toLowerCase() == 'paytm'){


          const MID = this.configService.get('PAYTM_MID');
          const marchantKey = this.configService.get('PAYTM_KEY');
          const url = this.configService.get('PAYTM_RECONCILE_URL');



          const paytmParams =  {};
          paytmParams['body'] = {
            "mid" : MID,
            "orderId":transactions[index]['orderNumber']
          }
          // const checksum = this.generateChecksum({MID,"ORDERID":transactions[index]['orderNumber']})
          PaytmChecksum.generateSignature(JSON.stringify(paytmParams['body']), marchantKey).then( async(checksum) =>{
            /* head parameters */
            paytmParams['head'] = {
                "signature"	: checksum
            };
            
           const paytmResponse= await this.httpService.post(url,paytmParams)
            .toPromise()
            // .then((paytmResponse:any) =>{
            //     console.log("data");
            //     // this.paymentService.paytmPaymentStatus(paytmResponse.data,null,true)
            // }).catch((error)=>{
            //   console.log(error);
              
            // })
        });
        
        }
        if(transactions[index]['paymentGateway']['pgName'].toLowerCase() == 'payu'){
  
          const key = this.configService.get('PAYU_KEY');
          const salt = this.configService.get('PAYU_SALT');
          const url = this.configService.get('PAYU_RECONCILE_URL');

          const cryp = crypto.createHash('sha512');
          const hashString = key + '|' +'verify_payment'+'|'+transactions[index]['orderNumber']+'|'+ salt
          cryp.update(hashString);
          const hash =  cryp.digest('hex');
          const params = new URLSearchParams()
          params.append('key', key),
          params.append('command','verify_payment')
          params.append('hash',hash)
          params.append('var1',transactions[index]['orderNumber'])
      
      
          // body[encodeURIComponent('key')] = encodeURIComponent(key)
          // body[encodeURIComponent('command')] = encodeURIComponent('verify_payment')
          // body[encodeURIComponent('hash')] =  encodeURIComponent(hash)
          // body[encodeURIComponent('var1')] = encodeURIComponent(transactions[index]['orderNumber'])
      
         const txnResponse =  await this.httpService.post(url,params,{ headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }})
          .toPromise()
            const txnData = txnResponse.data['transaction_details'][transactions[index]['orderNumber']];
            this.paymentService.payUPaymentStatus(txnData,null,true)

          // .then((tnxResponse) =>{
          //   console.log("res");
          //   // res.redirect('/v1/payments/status')
            
          // }).catch((error) =>{
          //   console.log("error >>>>>>>>",error);
            
          // })
          // this.httpService.get(`https://info.payu.in/merchant/postservice.php?form=1&key=${key}&command=verify_payment&hash=${hash}`)
          // .toPromise()
          // .then((res) =>{
          //   console.log("res");
            
          //   // req.redirect('/v1/payments/status',res.data)
          // }).catch((error) =>{
          //   console.log("error >>>>>>>>",error);
            
          // })
            // this.httpService.post(`https://info.payu.in/merchant/postservice.php?form=2`,{
            //   key,
            //   command:'verify_payment',
            //   hash,
            //   var1:transactions[index]['orderNumber']
      
            // })
            // .toPromise().then((res) =>{
            //   console.log("res");
              
            // }).catch((error) =>{
            //   console.log("error >>>>>>>>",error);
              
            // })
          
        }
      }else{
        this.transactionService.updateById(transactions[index].id, {
          transactionStatus: 'TXN_FAILURE',
        });
      }
      
    }
    return true;
  }
}
