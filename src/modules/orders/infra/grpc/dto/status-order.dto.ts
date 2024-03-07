import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class StatusOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  orderId: string;
}
