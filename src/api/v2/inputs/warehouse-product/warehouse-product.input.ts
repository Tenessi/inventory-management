import { InputType } from '@nestjs/graphql';
import { WarehouseProductModel } from 'src/db/graphql/models/warehouse-product/warehouse-product.model';

@InputType()
export class WarehouseProductInput extends WarehouseProductModel {}
