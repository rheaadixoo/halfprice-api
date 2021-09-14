import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CommentsDto {  

    @ApiProperty()
    readonly comment: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    readonly description: string;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly userId: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly leadId: number;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}