import { Inject, Injectable } from '@nestjs/common';
import { ProductModelFields } from 'src/common/types/models/product';
import { ProductInput, ProductUpdateInput } from './product.types';
import { Transaction } from 'objection';
import { ProductModel } from 'src/db/models/product/product.model';

@Injectable()
export class ProductRepository {
  constructor(@Inject(ProductModel.name) private readonly productModel: typeof ProductModel) {}

  async create(input: ProductInput, transaction?: Transaction): Promise<ProductModelFields> {
    return await this.productModel.query(transaction).insert(input);
  }

  async getAll(transaction?: Transaction): Promise<ProductModelFields[]> {
    return await this.productModel.query(transaction);
  }

  async getById(id: string, transaction?: Transaction): Promise<ProductModelFields | undefined> {
    return await this.productModel.query(transaction).findById(id);
  }

  async update(id: string, input: ProductUpdateInput, transaction?: Transaction): Promise<ProductModelFields> {
    return await this.productModel.query(transaction).patchAndFetchById(id, input);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.productModel.query(transaction).deleteById(id);
  }
}
