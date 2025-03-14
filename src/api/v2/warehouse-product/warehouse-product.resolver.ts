import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseProductService } from './warehouse-product.service';
import { WarehouseProductModel } from 'src/db/graphql/models/warehouse-product/warehouse-product.model';
import { WarehouseProductCreateRequestInput } from './inputs/request/create-request.input';
import { WarehouseProductModelFields } from 'src/common/types/models/warehouse-product';
import { WarehouseProductUpdateRequestInput } from './inputs/request/update-request.input';

@Resolver('WarehouseProducts')
export class WarehouseProductResolver {
  constructor(private readonly warehouseProductService: WarehouseProductService) {}

  @Mutation(() => WarehouseProductModel, { name: 'warehouseProductCreate' })
  async create(@Args('data') input: WarehouseProductCreateRequestInput): Promise<WarehouseProductModelFields> {
    return await this.warehouseProductService.create(input);
  }

  @Query(() => [WarehouseProductModel], { name: 'getAllWarehouseProducts' })
  async getAll(): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductService.getAll();
  }

  @Query(() => WarehouseProductModel, { name: 'getWarehouseProductById' })
  async getById(@Args('id') id: string): Promise<WarehouseProductModelFields | undefined> {
    return await this.warehouseProductService.getById(id);
  }

  @Query(() => [WarehouseProductModel], { name: 'getWarehouseProductByProductId' })
  async getByProduct(@Args('productId') productId: string): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductService.getByProduct(productId);
  }

  @Query(() => [WarehouseProductModel], { name: 'getWarehouseProductByWarehouseId' })
  async getByWarehouse(@Args('warehouseId') warehouseId: string): Promise<WarehouseProductModelFields[]> {
    return await this.warehouseProductService.getByWarehouse(warehouseId);
  }

  @Query(() => [WarehouseProductModel], { name: 'getWarehouseProductByWarehouseIdAndProductId' })
  async getByWarehouseAndProduct(@Args('warehouseId') warehouseId: string, @Args('productId') productId: string) {
    return await this.warehouseProductService.getByWarehouseAndProduct(warehouseId, productId);
  }

  @Mutation(() => WarehouseProductModel, { name: 'updateWarehouseProduct' })
  async update(
    @Args('id') id: string,
    @Args('data') input: WarehouseProductUpdateRequestInput,
  ): Promise<WarehouseProductModelFields> {
    return await this.warehouseProductService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteWarehouseProduct' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.warehouseProductService.delete(id);
  }
}
