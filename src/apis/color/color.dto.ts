import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ColorDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly hex: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly productId: number;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly images: string[];

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
