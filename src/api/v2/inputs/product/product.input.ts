import { InputType } from '@nestjs/graphql';
import { ProductModel } from 'src/db/graphql/models/product/product.model';

@InputType()
export class ProductInput extends ProductModel {}
