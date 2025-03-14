import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { WarehouseProductRequestDto } from './dto/request/request.dto';
import { WarehouseProductResponseDto } from './dto/response/response.dto';
import { WarehouseProductUpdateRequestDto } from './dto/request/update-request.dto';
import { Transaction } from 'objection';

@Injectable()
export class WarehouseProductService {
  constructor(private readonly repository: Repository) {}

  async create(dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouseProducts = await this.repository.warehouseProduct.getByWarehouseAndProduct(
        dto.warehouseId,
        dto.productId,
        transaction,
      );

      await this.checkWarehouseCapasity(dto.warehouseId, dto.quantity, transaction);

      if (warehouseProducts.length) {
        throw new ConflictException('Данный инвентарь уже существует');
      }

      return await this.repository.warehouseProduct.create(dto, transaction);
    });
  }

  async getAll(): Promise<WarehouseProductResponseDto[]> {
    return await this.repository.warehouseProduct.getAll();
  }

  async getById(id: string): Promise<WarehouseProductResponseDto | undefined> {
    return await this.repository.warehouseProduct.getById(id);
  }

  async getByProduct(productId: string): Promise<WarehouseProductResponseDto[]> {
    return await this.repository.warehouseProduct.getByProduct(productId);
  }

  async getByWarehouse(warehpuseId: string): Promise<WarehouseProductResponseDto[]> {
    return await this.repository.warehouseProduct.getByWarehouse(warehpuseId);
  }

  async update(id: string, dto: WarehouseProductUpdateRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouseProduct = await this.repository.warehouseProduct.getById(id, transaction);

      if (!warehouseProduct) {
        throw new NotFoundException('Связь склада и товара не найдена');
      }

      await this.checkWarehouseCapasity(warehouseProduct.warehouseId, dto.quantity, transaction);

      return await this.repository.warehouseProduct.update(id, dto, transaction);
    });
  }

  async delete(id: string): Promise<void> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouseProduct = await this.repository.warehouseProduct.getById(id, transaction);

      if (!warehouseProduct) {
        throw new NotFoundException('Связь склада и товара не найдена');
      }

      await this.repository.warehouseProduct.delete(id, transaction);
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
