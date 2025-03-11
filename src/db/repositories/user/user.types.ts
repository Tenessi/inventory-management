import { UserRole } from 'src/shared/enums/user-role.enum';

export type UserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UserUpdateInput = Omit<UserInput, 'email' | 'role'> & Partial<Pick<UserInput, 'email' | 'role'>>;
