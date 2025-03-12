import { Provider } from '@nestjs/common';
import { Knex } from 'knex';
import { Model } from 'objection';
import { KnexToken } from '../knex/knex.module';
import { UserModel } from './user/user.model';
import { TransactionModel } from './transaction/transaction.model';
import { WarehouseModel } from './warehouse/warehouse.model';
import { ProductModel } from './product/product.model';
import { WarehouseProductModel } from './warehouse-product/warehouse-product.model';

const CreateModelProvider = (model: typeof Model): Provider => {
  return {
    provide: model.name,
    useFactory: (knex: Knex) => {
      return model.bindKnex(knex);
    },
    inject: [KnexToken],
  };
};

const Models = [UserModel, TransactionModel, WarehouseModel, ProductModel, WarehouseProductModel];

export const ModelProviders = Models.map(CreateModelProvider);
