import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class WarehouseProductDto {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  warehouseId: string;
}
