import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRoleGuard } from '../guards/role.guard';
import { UserRole } from 'src/shared/enums/user-role.enum';

export function Role(...roles: UserRole[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(UserRoleGuard));
}
