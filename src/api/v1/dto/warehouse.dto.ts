import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class WarehouseDto {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  capacity: number;
}
