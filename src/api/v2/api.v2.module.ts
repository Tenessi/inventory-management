import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { getGraphQLConfig } from 'src/config/graphql.config';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { WarehouseProductModule } from './warehouse-product/warehouse-product.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';

const modules = [UserModule, ProductModule, WarehouseModule, WarehouseProductModule, TransactionModule];

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    ...modules,
    AuthModule,
  ],
})
export class ApiV2Module {}
