import { registerEnumType } from '@nestjs/graphql';

export enum TransactionType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'TransactionType enum',
});
