import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import { TransactionModelFields } from 'src/common/types/models/transaction';
import { INVENTORY_MANAGEMENT_TABLES } from 'src/db/constants';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';

@Injectable()
export class TransactionModel extends Model implements TransactionModelFields {
  id: string;
  date: string;
  quantity: number;
  type: TransactionType;
  userId: string;
  productId: string;
  warehouseId: string;

  static get tableName() {
    return INVENTORY_MANAGEMENT_TABLES.TRANSACTIONS;
  }
}
