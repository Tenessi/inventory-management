import { Module } from '@nestjs/common';
import { ModelsModule } from './models.module';
import { UserRepository } from './user/user.repository';
import { ProductRepository } from './product/product.repository';
import { TransactionRepository } from './transaction/transaction.repository';
import { WarehouseRepository } from './warehouse/warehouse.repository';
import { WarehouseProductRepository } from './warehouse-product/warehouse-product.repository';

const repositories = [
  UserRepository,
  ProductRepository,
  TransactionRepository,
  WarehouseRepository,
  WarehouseProductRepository,
];

@Module({
  imports: [ModelsModule],
  providers: repositories,
  exports: [...repositories, ModelsModule],
})
export class RepositoriesModule {}
