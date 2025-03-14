import { WarehouseProductDto } from 'src/api/v1/dto/warehouse-product.dto';

type WarehouseProductRequestType = Omit<WarehouseProductDto, 'id'>;

export class WarehouseProductRequestDto implements WarehouseProductRequestType {
  quantity: number;
  productId: string;
  warehouseId: string;

  constructor(quantity: number, productId: string, warehouseId: string) {
    this.quantity = quantity;
    this.productId = productId;
    this.warehouseId = warehouseId;
  }
}
