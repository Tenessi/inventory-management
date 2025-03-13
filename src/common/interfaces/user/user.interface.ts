import { UserRole } from 'src/shared/enums/user-role.enum';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
