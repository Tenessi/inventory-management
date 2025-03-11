import { Inject, Injectable } from '@nestjs/common';
import { KnexToken } from '../knex/knex.module';
import { Knex } from 'knex';
import { Transaction } from 'objection';
import { UserRepository } from './user/user.repository';
import { ProductRepository } from './product/product.repository';
import { TransactionRepository } from './transaction/transaction.repository';
import { WarehouseRepository } from './warehouse/warehouse.repository';
import { WarehouseProductRepository } from './warehouse-product/warehouse-product.repository';
import { AccountingRecordRepository } from './accounting-record/accounting-record.repository';

@Injectable()
export class Repository {
  constructor(
    public readonly user: UserRepository,
    public readonly product: ProductRepository,
    public readonly transaction: TransactionRepository,
    public readonly warehouse: WarehouseRepository,
    public readonly warehouseProduct: WarehouseProductRepository,
    public readonly accountingRecord: AccountingRecordRepository,
    @Inject(KnexToken) private readonly knex: Knex,
  ) {}

  withTransaction<T>(callback: (transaction: Transaction) => T | Promise<T>): Promise<T> {
    return this.knex.transaction(async (trx) => callback(trx));
  }
}
