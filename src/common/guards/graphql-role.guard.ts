import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { UserRoleRequest } from '../interfaces/guards/role-request.interface';

@Injectable()
export class GraphQLUserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!contextRoles) {
      return true;
    }

    console.log(contextRoles);

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: UserRoleRequest }>().req;
    const user = request.user;
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Вы не имеете достаточно прав для выполнения данного действия');
    }

    return contextRoles.some((role) => user.role === role);
  }
}
