import { WarehouseProductDto } from 'src/api/v1/dto/warehouse-product.dto';

type WarehouseProductUpdateRequestType = Omit<WarehouseProductDto, 'id' | 'productId' | 'warehouseId'>;

export class WarehouseProductUpdateRequestDto implements WarehouseProductUpdateRequestType {
  quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
  }
}
