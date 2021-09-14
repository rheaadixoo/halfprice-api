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

export class CollectionDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly config: any;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly banners: string;
    
  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}