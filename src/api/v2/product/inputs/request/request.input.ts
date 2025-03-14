import { InputType, OmitType } from '@nestjs/graphql';
import { ProductInput } from '../../../inputs/product/product.input';

@InputType()
export class ProductRequestInput extends OmitType(ProductInput, ['id']) {}
