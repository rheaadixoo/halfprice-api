import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class PaymentGatewayDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly pgName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly mid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly key: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly hash: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly website: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly pgUrl: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly cbUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly readTimeout: number;

  @IsOptional()
  @IsObject()
  @ApiProperty()
  readonly accountInfo: any;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly default: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
