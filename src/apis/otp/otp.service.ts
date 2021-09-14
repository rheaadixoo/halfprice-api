import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { OTP_REPOSITORY } from './otp.repository';
import { Otp } from './otp.model';
import { GenerateOtpDto, ValidateOtpDto } from './otp.dto';
import { CanOtpService } from 'src/common/services/otp/otp.service';
import { SmsService } from 'src/common/services/sms/sms.service';

@Injectable()
export class OtpService {
  constructor(
    @Inject(OTP_REPOSITORY) private readonly otpRepository: typeof Otp,
    private otpService: CanOtpService,
    private smsService: SmsService,
  ) {}

  async generate(otp: GenerateOtpDto): Promise<any> {
    const { loginOtp } = this.otpService.generateOtp();
    const otpData = await this.otpRepository.findOne({
      where: { mobile: otp.mobile },
    });
    if (!otpData) {
      await this.otpRepository.create<Otp>({
        mobile: otp.mobile,
        otp: loginOtp,
      });
    } else {
      await otpData.update(
        { otp: loginOtp },
        { where: { mobile: otp.mobile } },
      );
    }
    this.smsService.sendSms({
      mobile: otp.mobile,
      message: `${loginOtp} is your OTP to validate your phone number with Housr! Happy Coliving!`,
      route: 'api',
      type: 'otp',
    });
    return { message: `Otp sent successfully on ${otp.mobile}!` };
  }

  async validate(otp: ValidateOtpDto): Promise<any> {
    const otpData = await this.otpRepository.findOne({
      where: { mobile: otp.mobile, otp: otp.otp },
    });
    if (!otpData) {
      return { message: `Otp verification failed!`, isValid: false };
    }
    if (otpData) {
      const isValid = otp.otp === otpData.otp;
      if (!isValid) {
        return { message: `Otp verification failed!`, isValid: false };
      }
    }
    otpData.update({ otp: '' }, { where: { mobile: otp.mobile } });
    return { message: `Otp verified successfully!`, isValid: true };
  }
}
