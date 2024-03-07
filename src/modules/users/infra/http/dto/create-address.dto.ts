import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmpty, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAddresstDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  street: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  number: number;
  @ApiPropertyOptional()
  @IsEmpty()
  @IsString()
  reference?: string;
}
