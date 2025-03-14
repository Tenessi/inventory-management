import { InputType, OmitType } from '@nestjs/graphql';
import { WarehouseInput } from 'src/api/v2/inputs/warehouse/warehouse.input';

@InputType()
export class WarehouseCreateRequestInput extends OmitType(WarehouseInput, ['id']) {}
