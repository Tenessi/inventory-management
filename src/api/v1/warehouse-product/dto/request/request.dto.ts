import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';
import { WarehouseProductDto } from 'src/api/v1/dto/warehouse-product.dto';

type WarehouseProductRequestType = Omit<WarehouseProductDto, 'id'>;

export class WarehouseProductRequestDto implements WarehouseProductRequestType {
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

  constructor(quantity: number, productId: string, warehouseId: string) {
    this.quantity = quantity;
    this.productId = productId;
    this.warehouseId = warehouseId;
  }
}
