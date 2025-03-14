import { InputType } from '@nestjs/graphql';
import { TransactionModel } from 'src/db/graphql/models/transaction/transaction.model';

@InputType()
export class TransactionInput extends TransactionModel {}
