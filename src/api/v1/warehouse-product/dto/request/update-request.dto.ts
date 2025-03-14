import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { WarehouseProductDto } from 'src/api/v1/dto/warehouse-product.dto';

type WarehouseProductUpdateRequestType = Omit<WarehouseProductDto, 'id' | 'productId' | 'warehouseId'>;

export class WarehouseProductUpdateRequestDto implements WarehouseProductUpdateRequestType {
  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
  }
}
