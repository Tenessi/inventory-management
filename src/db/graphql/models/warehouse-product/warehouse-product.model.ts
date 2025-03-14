import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { WarehouseProductModelFields } from 'src/common/types/models/warehouse-product';

@ObjectType()
export class WarehouseProductModel implements WarehouseProductModelFields {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  warehouseId: string;
}
