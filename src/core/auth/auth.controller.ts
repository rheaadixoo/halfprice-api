import {
  Controller,
  Post,
  Body,
  HttpCode,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import {
  LoginEmailDto,
  RecoverDto,
  ResetPasswordDto,
  RecoverResponseDto,
  ResetPasswordResponseDto,
  LoginResponseDto,
  LoginOtpDto,
  GenerateMobileOtpDto,
} from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,   private configService: ConfigService) {}

  @Post('login/email')
  @HttpCode(200)
  async loginWithEmail(
    @Body(ValidationPipe) loginDto: LoginEmailDto,
  ): Promise<LoginResponseDto> {
    const { email, password, mobile } = loginDto;
    const token = await this.authService.generateToken(
      await this.authService.validateEmailAndPassword(email,mobile, password),
      this.configService.get('JWT_EXP_TIME')
    );
    if (!token) {
      throw new InternalServerErrorException();
    }
    return { token, type: 'Bearer' };
  }

  @Post('generate-otp')
  @HttpCode(200)
  async generateMobileOtp(
    @Body(ValidationPipe) otpDto: GenerateMobileOtpDto,
  ): Promise<RecoverResponseDto> {
    const { mobile } = otpDto;
    await this.authService.getMobileOtp(mobile);
    return { message: `Otp sent successfully on ${mobile}!` };
  }

  @Post('register/users')
  @HttpCode(200)
  async getMobileOtpWithUser(
    @Body(ValidationPipe) otpDto: GenerateMobileOtpDto,
  ): Promise<RecoverResponseDto> {
    const { mobile } = otpDto;
    return this.authService.getMobileOtpWithUser(mobile);
  }

  @Post('admin/generate-otp')
  @HttpCode(200)
  async generateInternalMobileOtp(
    @Body(ValidationPipe) otpDto: GenerateMobileOtpDto,
  ): Promise<RecoverResponseDto> {
    const { mobile } = otpDto;
    await this.authService.getInternalMobileOtp(mobile);
    return { message: `Otp sent successfully on ${mobile}!` };
  }

  // @Post('supplier/generate-otp')
  // @HttpCode(200)
  // async generateSupplierMobileOtp(
  //   @Body(ValidationPipe) otpDto: GenerateMobileOtpDto,
  // ): Promise<RecoverResponseDto> {
  //   const { mobile } = otpDto;
  //   await this.authService.getSupplierMobileOtp(mobile);
  //   return { message: `Otp sent successfully on ${mobile}!` };
  // }

  @Post('login/mobile')
  @HttpCode(200)
  async loginWithOtp(
    @Body(ValidationPipe) loginDto: LoginOtpDto,
  ): Promise<LoginResponseDto> {
    const { otp, mobile } = loginDto;
    const token = await this.authService.generateToken(
      await this.authService.validateMobileAndOtp(mobile, otp),
      this.configService.get('JWT_EXP_TIME')
    );
    if (!token) {
      throw new InternalServerErrorException();
    }
    return { token, type: 'Bearer' };
  }

  @Post('recover')
  @HttpCode(200)
  async recover(
    @Body(ValidationPipe) recoverDto: RecoverDto,
  ): Promise<RecoverResponseDto> {
    const { email } = recoverDto;
    await this.authService.getResetPasswordOtp(email);
    return { message: `Otp sent successfully on ${email}!` };
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<ResetPasswordResponseDto> {
    const { email, otp, password } = resetPasswordDto;
    const isSuccess = await this.authService.resetPassword(
      email,
      otp,
      password,
    );
    if (!isSuccess) {
      throw new InternalServerErrorException();
    }
    return { message: 'Password updated successfully!' };
  }
}
