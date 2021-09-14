import { CanAwsService } from 'libs/aws/src';
import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SMSParams } from './sms.type';

@Injectable()
export class SmsService {
  constructor(
    private awsService: CanAwsService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async sendSms(params: SMSParams) {
    if (!params.type) {
      params.type = 'sms';
    }
    if (params.type === 'sms') {
      if (params.route === 'aws') {
        return this.awsService.sendSMSThroughSNS({
          PhoneNumber: `+91${params.mobile}`,
          Message: params.message,
        });
      }
      return this.sendSmsUsingApi(params.mobile, params.message);
    }

    if (params.type === 'otp') {
      if (params.route === 'aws') {
        return this.awsService.sendSMSThroughSNS({
          PhoneNumber: `+91${params.mobile}`,
          Message: params.message,
        });
      }
      return this.sendOtpUsingApi(params.mobile, params.message);
    }
  }

  private sendSmsUsingApi(mobile: string, message: string) {
    const params = {
      authkey: this.configService.get('SMS_AUTH_KEY'),
      mobiles: mobile,
      country: this.configService.get('SMS_COUNTRY'),
      message: message,
      sender: this.configService.get('SMS_SENDER'),
      route: this.configService.get('SMS_ROUTE'),
    };
    const url = `${this.configService.get('SMS_BASE_URL')}/api/sendhttp.php`;
    return this.httpService.get(url, { params }).toPromise()
    .then((res) =>{
      console.log("res");
      
    })
    .catch((error) =>{
      console.log("error");
      
    });
  }

  private sendOtpUsingApi(mobile: string, message: string) {
    const params = {
      invisible: this.configService.get('OTP_INVISIBLE'),
      authkey: this.configService.get('OTP_AUTH_KEY'),
      otp: message.split(' ')[0].trim(),
      mobile: mobile,
      template_id: this.configService.get('OTP_TEMPLATE_ID'),
      sender: this.configService.get('OTP_SENDER_ID'),
    };
    const url = `${this.configService.get('OTP_BASE_URL')}/api/v5/otp`;
    return this.httpService.get(url, { params }).toPromise();
  }
}
