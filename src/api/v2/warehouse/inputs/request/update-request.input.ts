import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { WarehouseInput } from 'src/api/v2/inputs/warehouse/warehouse.input';

@InputType()
export class WarehouseUpdateRequestInput extends PartialType(OmitType(WarehouseInput, ['id'] as const)) {
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsNumber()
  capacity?: number;
}
