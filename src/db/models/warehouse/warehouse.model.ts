import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import { WarehouseModelFields } from 'src/common/types/models/warehouse';
import { INVENTORY_MANAGEMENT_TABLES } from 'src/db/constants';

@Injectable()
export class WarehouseModel extends Model implements WarehouseModelFields {
  id: string;
  name: string;
  capacity: number;

  static get tableName() {
    return INVENTORY_MANAGEMENT_TABLES.WAREHOUSES;
  }
}
