import { UserRole } from 'src/shared/enums/user-role.enum';

export class UserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
