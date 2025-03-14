import { IsNumber, IsString } from 'class-validator';
import { ProductDto } from '../../../dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';

type ProductRequestType = Omit<ProductDto, 'id'>;

export class ProductRequestDto implements ProductRequestType {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  price: number;

  constructor(name: string, price: number, description: string) {
    this.name = name;
    this.description = description;
    this.price = price;
  }
}
