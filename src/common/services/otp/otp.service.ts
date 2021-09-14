import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { totp } from 'otplib';

@Injectable()
export class CanOtpService {
  private secret: string;

  constructor(private configService: ConfigService) {
    totp.options = { step: parseInt(this.configService.get('OTP_EXP_MINUTE')) ,digits:4};
    // this.secret = this.configService.get('OTP_SECRET');
    this.secret = new Date().toISOString();
  }

  generateOtp() {
    const secretKey = this.secret+Math.random();
    return {loginOtp:totp.generate(secretKey), otpSecret:secretKey};
  }

  verifyOtp(otp: string, secret:string) {
    const isValid = totp.verify({
      token: otp,
      secret: secret,
    });
    return true;
  }
}
