import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  productId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  addressId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
