import { CanCommonModule } from 'libs/common/src';
import { DynamicModule, Module } from '@nestjs/common';
import { CanEmailNotificationModule } from './email/email.module';
import { CAN_NOTIFICATION_OPTIONS } from './notification.constant';
import { CanNotificationService } from './notification.service';
import { CanNotificationOptions } from './notification.type';
import { CanSmsNotificationModule } from './sms/sms.module';
import { CanWhatsappNotificationModule } from './whatsapp/whatsapp.module';

@Module({})
export class CanNotificationModule {
  static forRoot(options: CanNotificationOptions[]): DynamicModule {
    return {
      imports: [
        CanSmsNotificationModule.forRoot({}),
        CanEmailNotificationModule.forRoot({}),
        CanWhatsappNotificationModule.forRoot({}),

        CanCommonModule,
      ],
      module: CanEmailNotificationModule,
      providers: [
        {
          provide: CAN_NOTIFICATION_OPTIONS,
          useValue: options ? options : [],
        },
        CanNotificationService,
      ],
      exports: [CanNotificationService],
    };
  }
}
