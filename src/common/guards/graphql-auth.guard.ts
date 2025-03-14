import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class GraphQLJwtAuthGuard extends AuthGuard('graphql-jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: Request }>().req;

    return request;
  }
}
