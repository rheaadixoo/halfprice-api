import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { OrderStatus } from 'src/common/enums/order.enum';
import { Status } from 'src/common/enums/status.enum';
// import { Status } from '../status/status.model';

export class CartDetailsDto {


  @IsOptional()
  @IsEnum(OrderStatus)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly cartId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly businessId: number;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;

}