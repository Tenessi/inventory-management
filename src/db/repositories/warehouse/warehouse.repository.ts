import { Inject, Injectable } from '@nestjs/common';
import { WarehouseModel } from 'src/db/models/warehouse/warehouse.model';
import { WarehouseInput, WarehouseUpdateInput } from './warehouse.types';
import { WarehouseModelFields } from 'src/common/types/models/warehouse';
import { Transaction } from 'objection';

@Injectable()
export class WarehouseRepository {
  constructor(@Inject(WarehouseModel.name) private readonly warehouseModel: typeof WarehouseModel) {}

  async create(input: WarehouseInput, transaction?: Transaction): Promise<WarehouseModelFields> {
    return await this.warehouseModel.query(transaction).insert(input);
  }

  async getAll(transaction?: Transaction): Promise<WarehouseModelFields[]> {
    return await this.warehouseModel.query(transaction);
  }

  async getById(id: string, transaction?: Transaction): Promise<WarehouseModelFields | undefined> {
    return await this.warehouseModel.query(transaction).findById(id);
  }

  async update(id: string, input: WarehouseUpdateInput, transaction?: Transaction): Promise<WarehouseModelFields> {
    return await this.warehouseModel.query(transaction).patchAndFetchById(id, input);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.warehouseModel.query(transaction).deleteById(id);
  }
}
