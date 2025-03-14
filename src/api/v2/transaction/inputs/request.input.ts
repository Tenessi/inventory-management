import { Field, InputType, OmitType } from '@nestjs/graphql';
import { TransactionInput } from '../../inputs/transaction/transaction.input';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class TransactionRequestInput extends OmitType(TransactionInput, ['id', 'type', 'userId', 'date']) {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  date?: string;
}
