import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { GraphQLUserRoleGuard } from '../guards/graphql-role.guard';
import { UserRole } from 'src/shared/enums/user-role.enum';

export function GraphQLRole(...roles: UserRole[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(GraphQLUserRoleGuard));
}
