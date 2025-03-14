import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { TransactionDto } from 'src/api/v1/dto/transaction.dto';

type TransactionRequestType = Omit<TransactionDto, 'id' | 'date' | 'type' | 'userId'>;

export class TransactionRequestDto implements TransactionRequestType {
  @ApiProperty({
    type: 'number',
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: false,
    type: 'string',
  })
  @IsString()
  date?: string;

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

  constructor(quantity: number, warehouseId: string, productId: string) {
    this.quantity = quantity;
    this.warehouseId = warehouseId;
    this.productId = productId;
  }
}
