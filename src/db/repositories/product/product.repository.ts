import { Inject, Injectable } from '@nestjs/common';
import { ProductModelFields } from 'src/common/types/models/product';
import { ProductInput, ProductUpdateInput } from './product.types';
import { Transaction } from 'objection';
import { ProductModel } from 'src/db/models/product/product.model';
import { KnexToken } from 'src/db/knex/knex.module';
import { Knex } from 'knex';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject(ProductModel.name) private readonly productModel: typeof ProductModel,
    @Inject(KnexToken) private readonly knex: Knex,
  ) {}

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

  async getProductsQuantityByWarehouse(warehouseId: string, transaction?: Transaction): Promise<number> {
    const query = this.knex('warehouseProducts').sum('quantity as totalQuantity').first().where({ warehouseId });

    if (transaction) {
      query.transacting(transaction);
    }

    const raws = await query;
    return +raws?.totalQuantity;
  }
}
