import { Inject, Injectable } from '@nestjs/common';
import { TransactionModel } from 'src/db/models/transaction/transaction.model';
import { TransactionInput } from './transaction.types';
import { Transaction } from 'objection';
import { TransactionModelFields } from 'src/common/types/models/transaction';

@Injectable()
export class TransactionRepository {
  constructor(@Inject(TransactionModel.name) private readonly transactionModel: typeof TransactionModel) {}

  async create(input: TransactionInput, transaction?: Transaction): Promise<TransactionModelFields> {
    return await this.transactionModel.query(transaction).insert(input);
  }

  async getAll(transaction?: Transaction): Promise<TransactionModelFields[]> {
    return await this.transactionModel.query(transaction);
  }

  async getById(id: string, transaction?: Transaction): Promise<TransactionModelFields | undefined> {
    return await this.transactionModel.query(transaction).findById(id);
  }

  async getByUser(userId: string, transaction?: Transaction): Promise<TransactionModelFields[]> {
    return await this.transactionModel.query(transaction).where({ userId });
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.transactionModel.query(transaction).deleteById(id);
  }
}
