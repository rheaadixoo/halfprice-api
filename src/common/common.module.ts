import { CanAwsModule } from 'libs/aws/src';
import { HttpModule, Module } from '@nestjs/common';
import { SmsService } from './services/sms/sms.service';
import { EmailService } from './services/email/email.service';
import { CanOtpService } from './services/otp/otp.service';
import { QueryService } from './services/query/query.service';
import { CanDatasourceModule } from 'src/core/datasource/datasource.module';
import { PdfService } from './services/pdf/pdf.service';

@Module({
  imports: [
    CanAwsModule.forRoot({
      profile: process.env.AWS_PROFILE,
      region: process.env.AWS_REGION,
    }),
    HttpModule,
    CanDatasourceModule,
  ],
  providers: [SmsService, EmailService, CanOtpService, QueryService, PdfService],
  exports: [
    CanAwsModule,
    HttpModule,
    SmsService,
    EmailService,
    CanOtpService,
    QueryService,
  ],
})
export class CommonModule {}
