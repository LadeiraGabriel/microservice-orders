import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateRoleUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
  @ApiProperty({
    description: 'options to role CUSTOMER, DELIVERYMAN, ADMIN or ALL',
  })
  @IsNotEmpty()
  @IsString()
  role: 'CUSTOMER' | 'DELIVERYMAN' | 'ADMIN' | 'ALL';
}
