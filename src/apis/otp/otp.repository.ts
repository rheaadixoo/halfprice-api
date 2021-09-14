import { Otp } from './otp.model';

export const OTP_REPOSITORY = 'OTP_REPOSITORY';

export const OtpRepository = {
  provide: OTP_REPOSITORY,
  useValue: Otp,
};
