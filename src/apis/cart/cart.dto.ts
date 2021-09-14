import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CartDto {

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly totalAmount: number;

  @IsOptional()
  @ApiProperty()
  readonly status: string;


  @IsOptional()
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