import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/common/enums/status.enum';

export class SubscriptionDto {

    
  @IsOptional()
  @IsEnum(Status)
  @ApiProperty()
  readonly status: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly totalAmount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly timeSlot: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly startDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly endDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly scheduleType: string;

  @IsNotEmpty()
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