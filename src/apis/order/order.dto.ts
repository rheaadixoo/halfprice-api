import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from 'src/common/enums/order.enum';

enum PaymentStatus {
  NONE = 'none',
  BOOKING = 'booking',
  PARTIAL = 'partial',
  FULL = 'full',
}

enum Status {
  OPEN = 'open',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class OrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly orderNumber: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly estimatedCompletionDate: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  totalAmount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly itemAmount: number;


  @IsOptional()
  @IsEnum(PaymentStatus)
  @ApiProperty()
  readonly paymentStatus: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly payLater: boolean;


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly addressId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly cartId: number;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  readonly isAccepted:boolean;
  
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
