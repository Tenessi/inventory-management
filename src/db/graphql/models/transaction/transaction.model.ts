import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  date?: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @Field(() => TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  warehouseId: string;
}
