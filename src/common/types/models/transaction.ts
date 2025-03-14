import { TransactionType } from 'src/shared/enums/transaction-type.enum';

export interface TransactionModelFields {
  id: string;
  date?: string;
  quantity: number;
  type: TransactionType;
  userId: string;
  productId: string;
  warehouseId: string;
}
