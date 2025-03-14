import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { ProductModelFields } from 'src/common/types/models/product';
import { ProductUpdateRequestInput } from './inputs/update-request/update-request.input';
import { ProductRequestInput } from './inputs/request/request.input';

@Injectable()
export class ProductService {
  constructor(private readonly repository: Repository) {}

  async create(input: ProductRequestInput): Promise<ProductModelFields> {
    return await this.repository.product.create(input);
  }

  async getAll(): Promise<ProductModelFields[]> {
    return await this.repository.product.getAll();
  }

  async getById(id: string): Promise<ProductModelFields | undefined> {
    return await this.repository.product.getById(id);
  }

  async update(id: string, input: ProductUpdateRequestInput): Promise<ProductModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      const product = await this.repository.product.getById(id, transaction);

      if (!product) {
        throw new NotFoundException('Товар не найден');
      }

      return await this.repository.product.update(id, input, transaction);
    });
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.withTransaction(async (transaction) => {
      const product = await this.repository.product.getById(id, transaction);

      if (!product) {
        throw new NotFoundException('Товар не найден');
      }

      await this.repository.product.delete(id, transaction);

      return true;
    });
  }
}
