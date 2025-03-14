import { createParamDecorator, ExecutionContext, NotFoundException } from '@nestjs/common';
import { User } from '../interfaces/user/user.interface';
import { CustomRequest } from '../interfaces/request/custom-request.interface';

export const CurrentUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<CustomRequest>();
  const user = request.user;

  if (!user) {
    throw new NotFoundException('Пользователь в запросе не найден');
  }

  return data ? user[data] : user;
});
