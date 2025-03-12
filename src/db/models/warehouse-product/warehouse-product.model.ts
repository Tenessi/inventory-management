import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import { WarehouseProductModelFields } from 'src/common/types/models/warehouse-product';
import { INVENTORY_MANAGEMENT_TABLES } from 'src/db/constants';

@Injectable()
export class WarehouseProductModel extends Model implements WarehouseProductModelFields {
  id: string;
  quantity: number;
  productId: string;
  warehouseId: string;

  static get tableName() {
    return INVENTORY_MANAGEMENT_TABLES.WAREHOUSE_PRODUCTS;
  }
}
