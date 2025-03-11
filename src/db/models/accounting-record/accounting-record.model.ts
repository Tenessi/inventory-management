import { Injectable } from '@nestjs/common';
import { Model } from 'objection';
import { AccountingRecordModelFields } from 'src/common/types/models/accounting-record';
import { INVENTORY_MANAGEMENT_TABLES } from 'src/db/constants';

@Injectable()
export class AccountingRecordModel extends Model implements AccountingRecordModelFields {
  id: string;
  recordDate: string;
  quantity: number;
  transactionId: string;

  static get tableName() {
    return INVENTORY_MANAGEMENT_TABLES.ACCOUNTING_RECORDS;
  }
}
