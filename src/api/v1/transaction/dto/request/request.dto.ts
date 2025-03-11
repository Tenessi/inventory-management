import { TransactionDto } from 'src/api/v1/dto/transaction.dto';

type TransactionRequestType = Omit<TransactionDto, 'id' | 'date'>;

export class TransactionRequestDto implements TransactionRequestType {
  quantity: number;
  warehouseProductId: string;

  constructor(quantity: number, warehouseProductId: string) {
    this.quantity = quantity;
    this.warehouseProductId = warehouseProductId;
  }
}
