import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { WarehouseCreateRequestInput } from './inputs/request/create-request.input';
import { WarehouseModelFields } from 'src/common/types/models/warehouse';
import { WarehouseUpdateRequestInput } from './inputs/request/update-request.input';

@Injectable()
export class WarehouseService {
  constructor(private readonly repository: Repository) {}

  async create(input: WarehouseCreateRequestInput): Promise<WarehouseModelFields> {
    if (input.capacity < 0) {
      throw new ConflictException('Вместимость не может быть меньше 0');
    }

    return await this.repository.warehouse.create(input);
  }

  async getAll(): Promise<WarehouseModelFields[]> {
    return await this.repository.warehouse.getAll();
  }

  async geById(id: string): Promise<WarehouseModelFields | undefined> {
    return await this.repository.warehouse.getById(id);
  }

  async update(id: string, input: WarehouseUpdateRequestInput): Promise<WarehouseModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouse = await this.repository.warehouse.getById(id, transaction);

      if (!warehouse) {
        throw new NotFoundException('Склад не найден');
      }

      if (input.capacity) {
        if (input.capacity < 0) {
          throw new ConflictException('Вместимость не может быть меньше 0');
        }

        const warehouseQuantity = await this.repository.product.getProductsQuantityByWarehouse(warehouse.id);
        if (warehouseQuantity > input.capacity) {
          throw new ConflictException('Товаров не может быть больше, чем места на складе');
        }
      }

      return await this.repository.warehouse.update(id, input, transaction);
    });
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouse = await this.repository.warehouse.getById(id, transaction);

      if (!warehouse) {
        throw new NotFoundException('Склад не найден');
      }

      await this.repository.warehouse.delete(id, transaction);

      return true;
    });
  }
}
