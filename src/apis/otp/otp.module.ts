import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { OtpController } from './otp.controller';
import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';

@Module({
  imports: [CommonModule],
  controllers: [OtpController],
  providers: [OtpRepository, OtpService],
  exports: [OtpService],
})
export class OtpModule {}
