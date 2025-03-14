import { UserRole } from 'src/shared/enums/user-role.enum';

export type UserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UserUpdateInput = Partial<UserInput>;
