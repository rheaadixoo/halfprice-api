export interface PaytmInit {
  environment: 'development' | 'production';
  mid: string;
  key: string;
  website: string;
  callbackUrl: string;
}

export interface PaytmCreateTransaction {
  orderId: string;
  consumerId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  pinCode: string;
  address: string;
  transactionAmount: number;
}

export interface PaytmTransactionResponse {
  ORDERID: string;
  MID: string;
  TXNID: string;
  TXNAMOUNT: string;
  PAYMENTMODE: string;
  CURRENCY: string;
  TXNDATE: string;
  STATUS: string;
  RESPCODE: string;
  RESPMSG: string;
  GATEWAYNAME: string;
  BANKTXNID: string;
  BANKNAME: string;
  CHECKSUMHASH: string;
}

export interface PayUTransactionResponse {
  key?: string;
  txnid: string;
  amount: string;
  mode:string;
  hash: string;
  net_amount_debit:string;
  productinfo:string;
  payment_source:string;
  mihpayid:string;
  status:string;
}

export interface PaymentTransactionResponse extends PaytmTransactionResponse,PayUTransactionResponse{
}