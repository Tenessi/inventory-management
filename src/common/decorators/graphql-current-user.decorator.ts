import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../interfaces/user/user.interface';
import { CustomRequest } from '../interfaces/request/custom-request.interface';

export const GraphQLCurrentUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(ctx).getContext<{ req: CustomRequest }>();
  const user = gqlContext.req.user;

  if (!user) {
    throw new NotFoundException('Пользователь в запросе не найден');
  }

  return data ? user[data] : user;
});
