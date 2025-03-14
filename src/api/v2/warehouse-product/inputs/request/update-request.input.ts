import { InputType, OmitType } from '@nestjs/graphql';
import { WarehouseProductInput } from 'src/api/v2/inputs/warehouse-product/warehouse-product.input';

@InputType()
export class WarehouseProductUpdateRequestInput extends OmitType(WarehouseProductInput, [
  'id',
  'productId',
  'warehouseId',
]) {}
