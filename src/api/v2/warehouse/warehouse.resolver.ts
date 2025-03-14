import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseService } from './warehouse.service';
import { WarehouseModel } from 'src/db/graphql/models/warehouse/warehouse.model';
import { WarehouseCreateRequestInput } from './inputs/request/create-request.input';
import { WarehouseModelFields } from 'src/common/types/models/warehouse';
import { WarehouseUpdateRequestInput } from './inputs/request/update-request.input';

@Resolver('Warehouses')
export class WarehouseResolver {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Mutation(() => WarehouseModel, { name: 'createWarehouse' })
  async create(@Args('data') input: WarehouseCreateRequestInput): Promise<WarehouseModel> {
    return await this.warehouseService.create(input);
  }

  @Query(() => [WarehouseModel], { name: 'getAllWarehouses' })
  async getAll(): Promise<WarehouseModelFields[]> {
    return await this.warehouseService.getAll();
  }

  @Query(() => WarehouseModel, { name: 'getWarehouseById' })
  async getById(@Args('id') id: string): Promise<WarehouseModelFields | undefined> {
    return await this.warehouseService.geById(id);
  }

  @Mutation(() => WarehouseModel, { name: 'updateWarehouse' })
  async update(
    @Args('id') id: string,
    @Args('data') input: WarehouseUpdateRequestInput,
  ): Promise<WarehouseModelFields> {
    return await this.warehouseService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteWarehouse' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.warehouseService.delete(id);
  }
}
