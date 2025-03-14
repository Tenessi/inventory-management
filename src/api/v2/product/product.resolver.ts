import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductModel } from 'src/db/graphql/models/product/product.model';
import { ProductModelFields } from 'src/common/types/models/product';
import { ProductUpdateRequestInput } from './inputs/update-request/update-request.input';
import { ProductRequestInput } from './inputs/request/request.input';
import { GraphQLAuth } from 'src/common/decorators/graphql-auth.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';

@GraphQLAuth()
@Resolver('Products')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Mutation(() => ProductModel, { name: 'createProduct' })
  async create(@Args('data') input: ProductRequestInput): Promise<ProductModelFields> {
    return await this.productService.create(input);
  }

  @Query(() => [ProductModel], { name: 'getAllProducts' })
  async getAll(): Promise<ProductModelFields[]> {
    return await this.productService.getAll();
  }

  @Query(() => ProductModel, { name: 'getProductById' })
  async getById(@Args('id') id: string): Promise<ProductModelFields | undefined> {
    return await this.productService.getById(id);
  }

  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Mutation(() => ProductModel, { name: 'updateProduct' })
  async update(@Args('id') id: string, @Args('data') input: ProductUpdateRequestInput): Promise<ProductModelFields> {
    return await this.productService.update(id, input);
  }

  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Mutation(() => Boolean, { name: 'deleteProduct' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.productService.delete(id);
  }
}
