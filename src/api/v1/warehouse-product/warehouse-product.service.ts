import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { WarehouseProductRequestDto } from './dto/request/request.dto';
import { WarehouseProductResponseDto } from './dto/response/response.dto';

@Injectable()
export class WarehouseProductService {
  constructor(private readonly repository: Repository) {}

  async create(dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    await this.checkIfWarehouseProductExists(dto);

    return await this.repository.warehouseProduct.create(dto);
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

  async update(id: string, dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const warehouseProduct = await this.repository.warehouseProduct.getById(id, transaction);

      if (!warehouseProduct) {
        throw new NotFoundException('Связь склада и товара не найдена');
      }

      await this.checkIfWarehouseProductExists(dto);

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

  private async checkIfWarehouseProductExists(dto: WarehouseProductRequestDto) {
    const warehouseProducts = await this.repository.warehouseProduct.getByWarehouseAndProduct(
      dto.warehouseId,
      dto.productId,
    );

    if (warehouseProducts.length) {
      throw new ConflictException('Данный инвентарь уже существует');
    }
  }
}
