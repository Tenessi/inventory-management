import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { WarehouseProductModule } from './warehouse-product/warehouse-product.module';

const modules = [UserModule, AuthModule, ProductModule, WarehouseModule, WarehouseProductModule];

@Module({
  imports: modules,
})
export class ApiV1Module {}
