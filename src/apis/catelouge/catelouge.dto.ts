import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class CatelougeDto {

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
   csv: string;

  @IsOptional()
  @IsObject()
  @ApiProperty()
  readonly csvUrl: any;

  @IsOptional()
  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly businessId: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly isDemo: boolean
    
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly subCategoryId: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}