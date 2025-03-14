import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  id: string;

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
}
