import { CanAwsService } from 'libs/aws/src';
import {
  HttpService,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CAN_EMAIL_NOTIFICATION_OPTIONS } from './email.constant';
import { CanEmailNotificationOptions, CanEmailOptions } from './email.type';
import path = require('path');
import hbs = require('hbs');
import fs = require('fs');

@Injectable()
export class CanEmailNotificationService {
  constructor(
    @Inject(CAN_EMAIL_NOTIFICATION_OPTIONS)
    private emailNotificationOptions: CanEmailNotificationOptions,
    private awsService: CanAwsService,
    private httpService: HttpService,
  ) {}

  async sendEmail(params: CanEmailOptions[]) {
    const emailResponse: any[] = [];
    if (params && params.length) {
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        const aws = param.aws ?? this.emailNotificationOptions.aws;
        const api = param.api ?? this.emailNotificationOptions.api;
        if (param.channel === 'aws' && !aws) {
          throw new InternalServerErrorException(
            new Error(
              'aws config is required to send email through aws channel',
            ),
          );
        }
        if (param.channel === 'api' && !api) {
          throw new InternalServerErrorException(
            new Error(
              'api config is required to send email through api channel',
            ),
          );
        }
        const from = param.from ?? this.emailNotificationOptions.from;
        if (!from) {
          throw new InternalServerErrorException(
            new Error('from is required to send email notification'),
          );
        }
        param.from = from;
        if (param.template) {
          const template = param.template;
          const htmlPath = path.join(
            __dirname,
            '..',
            template.hbsHtmlTemplatePath,
          );
          const templateString = fs.readFileSync(htmlPath, 'utf8');
          const compiledTemplate = hbs.compile(templateString);
          const htmlTemplate = compiledTemplate(param.template.data);
          param.html = htmlTemplate;
          if (param.channel === 'aws' && aws) {
            const SES = await this.awsService.getSESObject(aws);
            emailResponse.push(
              await this.awsService.sendEmailThroughSES(param, SES),
            );
          }
          if (param.channel === 'api' && api) {
            emailResponse.push(await this.httpService.request(api).toPromise());
          }
        } else {
          emailResponse.push(await this.awsService.sendEmailThroughSES(param));
        }
      }
    } else {
      throw new InternalServerErrorException(
        new Error('email params is required to send email notification'),
      );
    }
    return emailResponse;
  }
}
