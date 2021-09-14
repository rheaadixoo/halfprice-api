import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from 'src/common/enums/order.enum';

export class ProgressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly icon: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly images: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly progress: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly remarks: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  @ApiProperty()
  readonly progressStatus: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly status: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
