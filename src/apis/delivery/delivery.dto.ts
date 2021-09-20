import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
} from 'class-validator';

export class DeliveryDto {


@IsOptional()
@IsNumber()
@ApiProperty()
readonly orderId: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}