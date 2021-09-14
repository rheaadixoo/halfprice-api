import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
} from 'class-validator';

export class InvoiceDto {

  @IsOptional()
  @ApiProperty()
  invoiceItems: any[];
    
@IsOptional()
@IsNumber()
@ApiProperty()
 createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
 updatedById: number;
}