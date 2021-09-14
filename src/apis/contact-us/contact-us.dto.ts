import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class ContactUsDto {


    @IsOptional()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsOptional()
    @ApiProperty()
    readonly fullName: string;

    @IsOptional()
    @ApiProperty()
    readonly subject: string;

    @IsOptional()
    @ApiProperty()
    readonly message: string;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}