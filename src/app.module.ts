import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ApisModule } from './apis/apis.module';
import { CanCommonModule } from 'libs/common/src';
import { CronModule } from './common/cron/cron.module';
import { BusinessModule } from 'src/apis/business/business.module';


@Module({
  imports: [CoreModule, ApisModule, CanCommonModule, CronModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
