import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly sku: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly brandName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly sellingPrice: number;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly thumbImages: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly images: string[];

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly hsnCode: string;

  @IsOptional()
  @ApiProperty()
  readonly featured:boolean;

  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly materialCare: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly specifications: any[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly availableStock: number;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;


  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly subCategoryId: number;

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

export class ProductStatusDto{
  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly approved: number[];

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly rejected: number[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly allStatus:string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly businessId:number;
}
