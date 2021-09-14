import { CanTextParserService } from 'libs/common/src';
import { Inject, Injectable } from '@nestjs/common';
import { CanEmailNotificationService } from './email/email.service';
import { CanEmailOptions } from './email/email.type';
import { CAN_NOTIFICATION_OPTIONS } from './notification.constant';
import {
  CanNotificationOptions,
  CanNotificationOptionsItem,
  CanNotificationSendOptions,
} from './notification.type';
import { CanSmsNotificationService } from './sms/sms.service';
import { CanSmsOptions } from './sms/sms.type';
import { CanWhatsappNotificationService } from './whatsapp/whatsapp.service';
import { CanWhatsappOptions } from './whatsapp/whatsapp.type';

@Injectable()
export class CanNotificationService {
  constructor(
    @Inject(CAN_NOTIFICATION_OPTIONS)
    private notificationOptions: CanNotificationOptions[],
    private smsNotificationService: CanSmsNotificationService,
    private emailNotificationService: CanEmailNotificationService,
    private whatsappNotificationService:CanWhatsappNotificationService,
    private textParserService: CanTextParserService,
  ) {}

  async sendNotification(options: CanNotificationSendOptions) {
    const config = this.findTriggerData<CanNotificationOptionsItem>(
      options.category,
      options.trigger,
    );
    if (options.sms && config.sms) {
      const data = options.data
        ? { ...(config.data ? config.data : {}), ...options.data }
        : {};
      const smsConfig = config.sms;
      const mappedSmsConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
        CanSmsOptions[]
      >({ ...data }, JSON.stringify(smsConfig));
      mappedSmsConfig.forEach(msc => {
        msc.mobile = options.sms.mobile;
     
      });
       this.smsNotificationService.sendSms(mappedSmsConfig);
    }
    if (options.email && config.email) {
      const data = options.data
        ? { ...(config.data ? config.data : {}), ...options.data }
        : {};
      const emailConfig = config.email;
      let mappedEmailConfig = [...emailConfig];
      mappedEmailConfig.forEach(mec => {
        mec.to = options.email.to;
        if (mec.template) {
          mec.template.data = {
            ...data,
          };
        }
      });
      mappedEmailConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
        CanEmailOptions[]
      >({ ...data }, JSON.stringify(emailConfig));
       this.emailNotificationService.sendEmail(mappedEmailConfig);
    }
    if(options.whatsapp && config.whatsapp){
      const data = options.data
      ? { ...(config.data ? config.data : {}), ...options.data }
      : {};
      // const whatsappData = options.data.whatsappData
      // ? { ...(config.data.whatsappData ? config.data.whatsappData : []), ...options.data.whatsappData }
      // : [];
    const whatsappConfig = config.whatsapp;
    const mappedWhatsappConfig = this.textParserService.replaceKeyWithValueInDynamicTextOrJSON<
    CanWhatsappOptions[]
    >({ ...data }, JSON.stringify(whatsappConfig));
    mappedWhatsappConfig.forEach(msc => {
      msc.mobile = options.whatsapp.mobile;
      msc.data =  data
      msc.triggerName = options.trigger.toLowerCase()
      // msc.api.body = {
      //   ...msc.api.body,
      //   to: '91'+msc.mobile,
      //   type: msc.type,
      // };
      // msc.api.body[msc.type] = msc.api[msc.type]
      // if(msc.type == 'hsm'){
      //   msc.api.body[msc.type]['localizable_params'] = options.data && options.data.whatsappData? options.data.whatsappData:[]
      //   msc.api.body[msc.type]["element_name"] = options.trigger.toLowerCase()
      //   msc.api.body = {
      //     body: msc.api.body
      //   }
      // } 
        
      // if(msc.type == 'template') {
      //   msc.api.body.ttl = 200000
      //   msc.api.body[msc.type]["name"] = options.trigger.toLowerCase()
      //   msc.api.body = {
      //     type: data.type,
      //     mime: data.mime,
      //     link: options.data.link,
      //     body : msc.api.body
      //   }
      // }
    });
    this.whatsappNotificationService.sendMessage(mappedWhatsappConfig)
    }
  }

  findTriggerData<T>(
    category: string,
    trigger: string,
    type?: 'sms' | 'email' | 'push' | 'whatsapp',
  ): T {
    const categories = this.notificationOptions.find(
      option => option.category === category,
    );
    const config = categories.items.find(item => item.trigger.name === trigger);
    if (type) {
      return config[type] as any;
    }
    return config as any;
  }
}
