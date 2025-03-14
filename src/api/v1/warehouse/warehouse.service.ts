import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { WarehouseRequestDto } from './dto/request/request.dto';
import { WarehouseResponseDto } from './dto/response/response.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly repository: Repository) {}

  async create(dto: WarehouseRequestDto): Promise<WarehouseResponseDto> {
    if (dto.capacity < 0) {
      throw new ConflictException('Вместимость не может быть меньше 0');
    }

    return await this.repository.warehouse.create(dto);
  }

  async getAll(): Promise<WarehouseResponseDto[]> {
    return await this.repository.warehouse.getAll();
  }

  async getById(id: string): Promise<WarehouseResponseDto | undefined> {
    return await this.repository.warehouse.getById(id);
  }

  async update(id: string, dto: WarehouseRequestDto): Promise<WarehouseResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouse = await this.repository.warehouse.getById(id, transaction);

      if (!warehouse) {
        throw new NotFoundException('Склад не найден');
      }

      if (dto.capacity < 0) {
        throw new ConflictException('Вместимость не может быть меньше 0');
      }

      const warehouseQuantity = await this.repository.product.getProductsQuantityByWarehouse(warehouse.id);
      if (warehouseQuantity > dto.capacity) {
        throw new ConflictException('Товаров не может быть больше, чем места на складе');
      }

      return await this.repository.warehouse.update(id, dto, transaction);
    });
  }

  async delete(id: string): Promise<void> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouse = await this.repository.warehouse.getById(id, transaction);

      if (!warehouse) {
        throw new NotFoundException('Склад не найден');
      }

      await this.repository.warehouse.delete(id, transaction);
    });
  }
}
