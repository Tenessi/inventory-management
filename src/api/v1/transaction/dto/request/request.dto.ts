import { TransactionDto } from 'src/api/v1/dto/transaction.dto';

type TransactionRequestType = Omit<TransactionDto, 'id' | 'date'>;

export class TransactionRequestDto implements TransactionRequestType {
  quantity: number;
  warehouseId: string;
  productId: string;

  constructor(quantity: number, warehouseId: string, productId: string) {
    this.quantity = quantity;
    this.warehouseId = warehouseId;
    this.productId = productId;
  }
}
