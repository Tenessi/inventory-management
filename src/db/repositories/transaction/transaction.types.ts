import { TransactionType } from 'src/shared/enums/transaction-type.enum';

export type TransactionInput = {
  quantity: number;
  type: TransactionType;
  userId: string;
  productId: string;
  warehouseId: string;
};
