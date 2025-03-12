import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'objection';
import { WarehouseProductModelFields } from 'src/common/types/models/warehouse-product';
import { WarehouseProductModel } from 'src/db/models/warehouse-product/warehouse-product.model';
import { WarehouseProductInput, WarehouseProductUpdateInput } from './warehouse-product.types';

@Injectable()
export class WarehouseProductRepository {
  constructor(
    @Inject(WarehouseProductModel.name) private readonly warehouseProductModel: typeof WarehouseProductModel,
  ) {}

  async create(input: WarehouseProductInput, transaction?: Transaction): Promise<WarehouseProductModelFields> {
    return await this.warehouseProductModel.query(transaction).insert(input);
  }

  async getAll(transaction?: Transaction): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductModel.query(transaction);
  }

  async getById(id: string, transaction?: Transaction): Promise<WarehouseProductModelFields | undefined> {
    return await this.warehouseProductModel.query(transaction).findById(id);
  }

  async getByProduct(productId: string, transaction?: Transaction): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductModel.query(transaction).where({ productId });
  }

  async getByWarehouse(warehouseId: string, transaction?: Transaction): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductModel.query(transaction).where({ warehouseId });
  }

  async getByWarehouseAndProduct(
    warehouseId: string,
    productId: string,
    transaction?: Transaction,
  ): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductModel.query(transaction).where({ warehouseId, productId });
  }

  async update(
    id: string,
    input: WarehouseProductUpdateInput,
    transaction?: Transaction,
  ): Promise<WarehouseProductModelFields> {
    return await this.warehouseProductModel.query(transaction).patchAndFetchById(id, input);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.warehouseProductModel.query(transaction).deleteById(id);
  }
}
