import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProductModelFields } from 'src/common/types/models/product';

@ObjectType()
export class ProductModel implements ProductModelFields {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsOptional()
  description: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
