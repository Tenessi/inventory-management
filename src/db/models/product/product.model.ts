import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import { ProductModelFields } from 'src/common/types/models/product';
import { INVENTORY_MANAGEMENT_TABLES } from 'src/db/constants';

@Injectable()
export class ProductModel extends Model implements ProductModelFields {
  id: string;
  name: string;
  description?: string;
  price: number;

  static get tableName() {
    return INVENTORY_MANAGEMENT_TABLES.PRODUCTS;
  }
}
