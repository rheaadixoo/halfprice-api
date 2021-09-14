import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class SubCategoryDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  readonly banners: string[];

  @IsOptional()
  @ApiProperty()
  readonly icon: string;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly categoryId: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly createdById: number;
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly updatedById: number;
}
