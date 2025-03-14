import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class TransactionDto {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  date: string;

  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  warehouseId: string;

  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  productId: string;
}
