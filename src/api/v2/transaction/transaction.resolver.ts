import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { TransactionModel } from 'src/db/graphql/models/transaction/transaction.model';
import { TransactionRequestInput } from './inputs/request.input';
import { TransactionModelFields } from 'src/common/types/models/transaction';
import { GraphQLCurrentUser } from 'src/common/decorators/graphql-current-user.decorator';
import { GraphQLAuth } from 'src/common/decorators/graphql-auth.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { GraphQLRole } from 'src/common/decorators/graphql-user-role.decorator';

@GraphQLAuth()
@Resolver('Transaction')
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @GraphQLRole(UserRole.ACCOUNTANT)
  @Mutation(() => TransactionModel, { name: 'incomingTransaction' })
  async incoming(
    @Args('data') input: TransactionRequestInput,
    @GraphQLCurrentUser('id') userId: string,
  ): Promise<TransactionModelFields> {
    return await this.transactionService.incoming(input, userId);
  }

  @GraphQLRole(UserRole.WAREHOUSE)
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
