import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { UserService } from '../user/user.service';
import { comparePassword } from '../../common/utils/bcrypt';
import { User } from '../user/user.model';
import * as moment from 'moment';
import { EmailService } from '../../common/services/email/email.service';
import { CanOtpService } from '../../common/services/otp/otp.service';
import { SmsService } from '../../common/services/sms/sms.service';
import { CanNotificationService } from '@can/notification';
import { ConfigService } from '@nestjs/config';
import { Op } from 'sequelize';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private emailService: EmailService,
    private smsService: SmsService,
    private otpService: CanOtpService,
    private notificationService: CanNotificationService,
    private configService: ConfigService,
  ) {}

  /**
   * Validate Email and Compare the Password
   *
   * @param email: string
   * @param password: string
   *
   * @return null | User
   */
  async validateEmailAndPassword(email: string,mobile:string, password: string) {
    const where = email ?{ email }: mobile ? { mobile } : null 
    if(!where){
      throw new ForbiddenException('Email or mobile cannot be null');
    }
    // Validate User
    const user = await this.userService.findOne({ where });
    if (!user) {
      throw new ForbiddenException();
    }
    // Compare Password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new ForbiddenException();
    }
    // Return User Data
    return user;
  }

  /**
   * Validate Mobile and OTP
   *
   * @param mobile: string
   * @param otp: string
   *
   * @return null | User
   */
  async validateMobileAndOtp(mobile: string, otp: string) {
    // Validate User
    const user = await this.userService.findOne({
      where: {
        mobile,
        loginOtp: otp,
      },
    });
    if (!user) {
      throw new ForbiddenException();
    }
    // Validate Otp
    if (!this.otpService.verifyOtp(otp,user.otpSecret)) {
      throw new ForbiddenException();
    }
    // Reset OTP in DB
    await this.userService.updateById(user.id, {
      loginOtp: null,
    });
    // Return User Data
    return user;
  }

  /**
   *
   * @param email : string
   *
   * @return string
   */
  async getResetPasswordOtp(email: string): Promise<string> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      throw new ForbiddenException();
    }
    const resetPasswordOtpExpiresIn = moment()
      .add('minutes', 10)
      .toISOString(); // 10 Min from Current Time
    const resetPasswordOtp = this.otpService.generateOtp().loginOtp;
    await this.userService.updateById(user.id, {
      resetPasswordOtpExpiresIn,
      resetPasswordOtp,
    });
    const url =  this.configService.get('WEB_URL');
    this.notificationService.sendNotification({
      category: 'Users',
      trigger: 'FORGOT_PASSWORD',
      data: {
        firstName: user.firstName,
        url:url
      },
      email: {
        to: [user.email],
      }
    });
    this.emailService.sendEmail({
      to: email,
      subject: 'Reset Password',
      html: `<strong>${resetPasswordOtp}</strong> is your Occupi verification code. Now let's get your home move-in ready!`,
    });
    return resetPasswordOtp;
  }

  /**
   *
   * @param mobile : string
   *
   * @return string
   */
  async getMobileOtp(mobile: string): Promise<string> {
    let user = await this.userService.findOne({ where: { mobile } });
    if (!user) {
      throw new ForbiddenException();
    }
    const {loginOtp , otpSecret} = this.otpService.generateOtp();
    await this.userService.updateById(user.id, {
      loginOtp:'1234',
      otpSecret
    });
    this.smsService.sendSms({
      mobile: mobile,
      message: `${1234} is your Occupi verification code. Now let's get your home move-in ready!`,
      route: 'api',
      type: 'otp',
    });

    return loginOtp;
  }



    /**
   *
   * @param mobile : string
   *
   * @return string
   */
     async getMobileOtpWithUser(mobile: string): Promise<any> {
      let user = await this.userService.findOne({ where: { mobile } });
      if (!user) {
        const userData :any  = {
          mobile
        }
        user = await this.userService.create(userData)
        // throw new ForbiddenException();
      }
      const {loginOtp , otpSecret} = this.otpService.generateOtp();
      await this.userService.updateById(user.id, {
        loginOtp:'1234',
        otpSecret
      });
      this.smsService.sendSms({
        mobile: mobile,
        message: `${1234} is your Occupi verification code. Now let's get your home move-in ready!`,
        route: 'api',
        type: 'otp',
      });
  
      return user;
    }
  async getInternalMobileOtp(mobile: string): Promise<string> {
    const user = await this.userService.findOne({ where: { mobile , type:'internal'} });
    if (!user) {
      throw new ForbiddenException();
    }
    const {loginOtp , otpSecret} = this.otpService.generateOtp();
    await this.userService.updateById(user.id, {
      loginOtp:'1234',
      otpSecret
    });
    this.smsService.sendSms({
      mobile: mobile,
      message: `${1234} is your Occupi verification code. Now let's get your home move-in ready!`,
      route: 'api',
      type: 'otp',
    });
  
    return loginOtp;
  }

  // async getSupplierMobileOtp(mobile: string): Promise<string> {
  //   const user = await this.userService.findOne({ where: { mobile , 
  //     [Op.or]:[{
  //       type:{ [Op.eq] : 'internal'}
  //   },
  //   {
  //     type:{ [Op.eq] : 'supplier'}
  // }
  // ]} });
  //   if (!user) {
  //     throw new ForbiddenException();
  //   }
  //   const {loginOtp , otpSecret} = this.otpService.generateOtp();
  //   await this.userService.updateById(user.id, {
  //     loginOtp:'1234',
  //     otpSecret
  //   });
  //   this.smsService.sendSms({
  //     mobile: mobile,
  //     message: `${1234} is your Occupi verification code. Now let's get your home move-in ready!`,
  //     route: 'api',
  //     type: 'otp',
  //   });

  //   return loginOtp;
  // }
  /**
   *
   * @param token : string
   * @param password : string
   *
   * @return boolean
   */
  async resetPassword(email: string, otp: string, password: string) {
    const user = await this.userService.findOne({
      where: { email: email, resetPasswordOtp: otp },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    const { resetPasswordOtpExpiresIn } = user;

    if (moment(resetPasswordOtpExpiresIn).isBefore(moment())) {
      throw new ForbiddenException();
    }

    const isValid = this.otpService.verifyOtp(otp,user.otpSecret);

    if (!isValid) {
      throw new ForbiddenException();
    }

    await this.userService.updateById(user.id, {
      password,
      resetPasswordOtpExpiresIn: null,
      resetPasswordOtp: null,
    });
    const url =  this.configService.get('WEB_URL');
    this.notificationService.sendNotification({
      category: 'Users',
      trigger: 'RESET_PASSWORD_SUCCESSFUL',
      data: {
        firstName: user.firstName,
        url: url
        },
      email: {
        to: [user.email],
      }
    });
    return true;
  }

  /**
   * Generate JWT Token with User Data
   *
   * @param user : UserDto
   *
   * @return string
   */
  async generateToken(user: User, expiresIn: number | string = '365days') {
    return this.jwtService.signAsync(_.pick(user, ['id', 'name', 'email']), {
      expiresIn,
    });
  }

  /**
   * Validate the JWT Token is Expired or Invalid Token
   *
   * @param token: string
   *
   * @return any
   */
  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  /**
   * Extract the Data from the Token
   *
   * @param token : string
   *
   * @return any
   */
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
