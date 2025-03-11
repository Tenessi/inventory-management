import { UserRole } from 'src/shared/enums/user-role.enum';
import { UserDto } from '../../dto/user.dto';

type UserRequestType = Omit<UserDto, 'id'>;

export class UserRequestDto implements UserRequestType {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  constructor(name: string, email: string, password: string, role: UserRole) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
