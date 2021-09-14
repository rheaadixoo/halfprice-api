import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { GenerateOtpDto, ValidateOtpDto } from './otp.dto';
import { OtpService } from './otp.service';

@Controller('otps')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('generate')
  @HttpCode(200)
  async generate(@Body(ValidationPipe) otpDto: GenerateOtpDto) {
    return this.otpService.generate(otpDto);
  }

  @Post('validate')
  @HttpCode(200)
  async validate(@Body(ValidationPipe) otpDto: ValidateOtpDto) {
    return this.otpService.validate(otpDto);
  }
}
