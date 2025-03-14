import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { WarehouseProductModelFields } from 'src/common/types/models/warehouse-product';
import { Repository } from 'src/db/repositories/repository';
import { WarehouseProductCreateRequestInput } from './inputs/request/create-request.input';
import { WarehouseProductUpdateRequestInput } from './inputs/request/update-request.input';
import { Transaction } from 'objection';

@Injectable()
export class WarehouseProductService {
  constructor(private readonly repository: Repository) {}

  async create(input: WarehouseProductCreateRequestInput): Promise<WarehouseProductModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      await this.checkWarehouseCapasity(input.warehouseId, input.quantity, transaction);

      const warehouseProducts = await this.repository.warehouseProduct.getByWarehouseAndProduct(
        input.warehouseId,
        input.productId,
        transaction,
      );

      if (warehouseProducts.length) {
        throw new ConflictException('Данный инвентарь уже существует');
      }

      return await this.repository.warehouseProduct.create(input, transaction);
    });
  }

  async getAll(): Promise<WarehouseProductModelFields[]> {
    return await this.repository.warehouseProduct.getAll();
  }

  async getById(id: string): Promise<WarehouseProductModelFields | undefined> {
    return await this.repository.warehouseProduct.getById(id);
  }

  async getByWarehouse(warehouseId: string): Promise<WarehouseProductModelFields[]> {
    return await this.repository.warehouseProduct.getByWarehouse(warehouseId);
  }

  async getByProduct(productId: string): Promise<WarehouseProductModelFields[]> {
    return await this.repository.warehouseProduct.getByProduct(productId);
  }

  async getByWarehouseAndProduct(warehouseId: string, productId: string): Promise<WarehouseProductModelFields[]> {
    return await this.repository.warehouseProduct.getByWarehouseAndProduct(warehouseId, productId);
  }

  async update(id: string, input: WarehouseProductUpdateRequestInput): Promise<WarehouseProductModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouseProduct = await this.repository.warehouseProduct.getById(id, transaction);

      if (!warehouseProduct) {
        throw new NotFoundException('Данный нвентарь в складе не найден');
      }

      await this.checkWarehouseCapasity(warehouseProduct.warehouseId, input.quantity, transaction);

      return await this.repository.warehouseProduct.update(id, input, transaction);
    });
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouseProduct = await this.repository.warehouseProduct.getById(id);

      if (!warehouseProduct) {
        throw new NotFoundException('Данный нвентарь в складе не найден');
      }

      await this.repository.warehouseProduct.delete(id, transaction);

      return true;
    });
  }

  private async checkWarehouseCapasity(warehouseId: string, dtoQuantity: number, transaction: Transaction) {
    const warehouse = await this.repository.warehouse.getById(warehouseId, transaction);

    if (!warehouse) {
      throw new NotFoundException('Склад не найден');
    }

    const warehouseQuantity = await this.repository.product.getProductsQuantityByWarehouse(warehouseId, transaction);
    const potencialWarehouseQuantity = warehouseQuantity + dtoQuantity;

    if (warehouse.capacity < potencialWarehouseQuantity) {
      throw new ConflictException('Недостаточно места для товара на складе');
    }
  }
}
