import { CanAwsSendEmailParams, CanAwsService } from 'libs/aws/src';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private awsService: CanAwsService,
    private configService: ConfigService,
  ) {}

  async sendEmail(params: CanAwsSendEmailParams) {
    if (!params.from) {
      params.from = this.configService.get('EMAIL_FROM');
    }
    return this.awsService.sendEmailThroughSES(params);
  }
}
