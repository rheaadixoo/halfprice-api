import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly pgTransactionId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly totalAmount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly platform: string;

  // @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  readonly requestPayload: any;

  @IsOptional()
  @ApiProperty()
  readonly responsePayload: any;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly remarks: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly transactionStatus: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly transactionType: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  orderNumber: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly paymentGatewayId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
