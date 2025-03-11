import { ProductDto } from '../../../dto/product.dto';

type ProductRequestType = Omit<ProductDto, 'id'>;

export class ProductRequestDto implements ProductRequestType {
  name: string;
  description?: string;
  price: number;

  constructor(name: string, price: number, description?: string) {
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
