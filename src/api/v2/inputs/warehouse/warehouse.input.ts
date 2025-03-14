import { InputType } from '@nestjs/graphql';
import { WarehouseModel } from 'src/db/graphql/models/warehouse/warehouse.model';

@InputType()
export class WarehouseInput extends WarehouseModel {}
