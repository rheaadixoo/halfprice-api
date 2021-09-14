export interface SMSParams {
  type?: 'sms' | 'otp';
  route: 'aws' | 'api';
  mobile: string;
  message: string;
}
