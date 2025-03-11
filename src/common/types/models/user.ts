import { UserRole } from 'src/shared/enums/user-role.enum';

export interface UserModelFields {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
