import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex',
}

enum Type {
  COSTOMER = 'customer',
  SUPPLIER = 'supplier',
  INTERNAL = 'internal',
}

export class UserDto {
  @IsOptional()
  @ApiProperty()
   firstName: string;

  @IsOptional()
  @ApiProperty()
   middleName: string;

  @IsOptional()
  @ApiProperty()
   lastName: string;

  @IsOptional()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly businessName: string;

  // @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  // @IsNotEmpty()
  // @MinLength(10)
  // @MaxLength(10)
  @IsOptional()
  @ApiProperty()
  readonly mobile: string;

  @IsOptional()
  @ApiProperty()
  readonly profileImage: string;

  @IsOptional()
  readonly loginInfo: any;

  @IsOptional()
  readonly otpSecret: any;

  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  readonly resetPasswordOtpExpiresIn: string;

  @IsOptional()
  readonly resetPasswordOtp: string;

  @IsOptional()
  readonly loginOtp: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty()
  readonly gender: string;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsEnum(Type)
  @ApiProperty()
  readonly type: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly businessId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
