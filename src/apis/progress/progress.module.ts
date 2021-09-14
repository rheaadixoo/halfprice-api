import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/core/user/user.module';
import { OrderModule } from '../order/order.module';
import { SharedModule } from '../shared/shared.module';
import { ProgressController } from './progress.controller';
import { ProgressRepository } from './progress.repository';
import { ProgressService } from './progress.service';

@Module({
    
    imports: [forwardRef(() => OrderModule),ConfigModule, SharedModule, UserModule],
  controllers: [ProgressController],
  providers: [ProgressRepository, ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
