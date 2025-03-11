import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { ProductRequestDto } from './dto/request/request.dto';
import { ProductResponseDto } from './dto/response/response.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: Repository) {}

  async create(dto: ProductRequestDto): Promise<ProductResponseDto> {
    return await this.repository.product.create(dto);
  }

  async getAll(): Promise<ProductResponseDto[]> {
    return await this.repository.product.getAll();
  }

  async getById(id: string): Promise<ProductResponseDto | undefined> {
    return await this.repository.product.getById(id);
  }

  async update(id: string, dto: ProductRequestDto): Promise<ProductResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const product = await this.repository.product.getById(id, transaction);

      if (!product) {
        throw new NotFoundException('Товар не найден');
      }

      return await this.repository.product.update(id, dto, transaction);
    });
  }

  async delete(id: string): Promise<void> {
    return await this.repository.withTransaction(async (transaction) => {
      const product = await this.repository.product.getById(id, transaction);

      if (!product) {
        throw new NotFoundException('Товар не найден');
      }

      await this.repository.product.delete(id, transaction);
    });
  }
}
