import { Field, InputType, PartialType, OmitType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { ProductInput } from 'src/api/v2/inputs/product/product.input';

@InputType()
export class ProductUpdateRequestInput extends PartialType(OmitType(ProductInput, ['id'] as const)) {
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsNumber()
  price?: number;
}
