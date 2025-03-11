import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';

const modules = [UserModule, AuthModule, ProductModule, WarehouseModule];

@Module({
  imports: modules,
})
export class ApiV1Module {}
