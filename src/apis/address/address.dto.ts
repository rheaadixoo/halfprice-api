import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class AddressDto {
  @IsOptional()
  @ApiProperty()
  readonly registeredName: string;

  @IsOptional()
  @ApiProperty()
  readonly name: string;


  @IsOptional()
  @ApiProperty()
  readonly lat: string;


  @IsOptional()
  @ApiProperty()
  readonly lng: string;

  @IsOptional()
  @ApiProperty()
  readonly gstin: string;

  @IsOptional()
  @ApiProperty()
  readonly gstinImage: string;

  @IsOptional()
  @ApiProperty()
  readonly panNumber: string;

  @IsOptional()
  @ApiProperty()
  readonly country: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly state: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly city: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly pinCode: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly address: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  readonly default: boolean;

  // @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly userId: number;
}
