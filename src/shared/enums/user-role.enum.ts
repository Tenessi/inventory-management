import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  WAREHOUSE = 'WAREHOUSE',
  ACCOUNTANT = 'ACCOUNTANT',
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role enum',
});
