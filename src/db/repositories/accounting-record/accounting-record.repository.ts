import { Inject, Injectable } from '@nestjs/common';
import { AccountingRecordModel } from 'src/db/models/accounting-record/accounting-record.model';
import { AccountingRecordInput, AccountingRecordUpdateInput } from './accounting-record.types';
import { Transaction } from 'objection';
import { AccountingRecordModelFields } from 'src/common/types/models/accounting-record';

@Injectable()
export class AccountingRecordRepository {
  constructor(
    @Inject(AccountingRecordModel.name) private readonly accountingRecordModel: typeof AccountingRecordModel,
  ) {}

  async create(input: AccountingRecordInput, transaction?: Transaction): Promise<AccountingRecordModelFields> {
    return await this.accountingRecordModel.query(transaction).insert(input);
  }

  async getAll(transaction?: Transaction): Promise<AccountingRecordModelFields[]> {
    return await this.accountingRecordModel.query(transaction);
  }

  async getById(id: string, transaction?: Transaction): Promise<AccountingRecordModelFields | undefined> {
    return await this.accountingRecordModel.query(transaction).findById(id);
  }

  async getByTransaction(transactionId: string, transaction?: Transaction): Promise<AccountingRecordModelFields[]> {
    return await this.accountingRecordModel.query(transaction).where({ transactionId });
  }

  async update(
    id: string,
    input: AccountingRecordUpdateInput,
    transaction?: Transaction,
  ): Promise<AccountingRecordModelFields> {
    return await this.accountingRecordModel.query(transaction).patchAndFetchById(id, input);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.accountingRecordModel.query(transaction).deleteById(id);
  }
}
