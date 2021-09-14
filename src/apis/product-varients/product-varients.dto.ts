import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductVarientsDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly productId: number;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}