import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { WarehouseModelFields } from 'src/common/types/models/warehouse';

@ObjectType()
export class WarehouseModel implements WarehouseModelFields {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  capacity: number;
}
