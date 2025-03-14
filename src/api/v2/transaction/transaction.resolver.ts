import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { TransactionModel } from 'src/db/graphql/models/transaction/transaction.model';
import { TransactionRequestInput } from './inputs/request.input';
import { TransactionModelFields } from 'src/common/types/models/transaction';
import { GraphQLCurrentUser } from 'src/common/decorators/graphql-current-user.decorator';

@Resolver('Transaction')
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Mutation(() => TransactionModel, { name: 'incomingTransaction' })
  async incoming(
    @Args('data') input: TransactionRequestInput,
    @GraphQLCurrentUser('id') userId: string,
  ): Promise<TransactionModelFields> {
    return await this.transactionService.incoming(input, userId);
  }

  @Mutation(() => TransactionModel, { name: 'outgoingTransaction' })
  async outgoing(
    @Args('data') input: TransactionRequestInput,
    @GraphQLCurrentUser('id') userId: string,
  ): Promise<TransactionModelFields> {
    return await this.transactionService.outgoing(input, userId);
  }

  @Query(() => [TransactionModel], { name: 'getAllTransaction' })
  async getAll(): Promise<TransactionModelFields[]> {
    return await this.transactionService.getAll();
  }
}
