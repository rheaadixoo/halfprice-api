import { CanAwsService } from 'libs/aws/src';
import {
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CAN_SMS_NOTIFICATION_OPTIONS } from './sms.constant';
import { CanSmsNotificationOptions, CanSmsOptions } from './sms.type';

@Injectable()
export class CanSmsNotificationService {
  constructor(
    @Inject(CAN_SMS_NOTIFICATION_OPTIONS)
    private smsNotificationOptions: CanSmsNotificationOptions,
    private awsService: CanAwsService,
    private httpService: HttpService,
  ) {}

  async sendSms(params: CanSmsOptions[]) {
    const smsResponse: any[] = [];
    if (params && params.length) {
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if(param.type == 'template'){
          param.api.data = {
            ...param.api.data,
            sms :[{
              to: [param.mobile],
              message: param.message,
            }],
            DLT_TE_ID : param.templateId
          }
          param.api.headers['Content-Type'] = 'application/json'
        }else{
          param.api.params = {
            ...param.api.params,
            mobiles: param.mobile,
            message: param.message,
          };
        }
        const aws = param.aws ?? this.smsNotificationOptions.aws;
        const api = param.api ?? this.smsNotificationOptions.api;

        if (param.channel === 'aws' && !aws) {
          throw new Error('aws config is required to send sms through aws channel')
        }
        if (param.channel === 'api' && !api) {
          throw new Error('api config is required to send sms through api channel')
        }
        if (param.channel === 'aws' && aws) {
          const SNS = await this.awsService.getSNSObject(aws);
          smsResponse.push(
            await this.awsService.sendSMSThroughSNS(
              { PhoneNumber: param.mobile, Message: param.message },
              SNS,
            ),
          );
        }
        if (param.channel === 'api' && api) {
          try {
            smsResponse.push(await this.httpService.request(api).toPromise());          
          } catch (error) {
            throw new Error('sms params is required to send sms notification')
            
          }
        }
      }
    } else {
      throw new Error('sms params is required to send sms notification')
    }
    return smsResponse;
  }
}
