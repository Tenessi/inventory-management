import { UserDto } from 'src/api/v1/dto/user.dto';
import { UserRole } from 'src/shared/enums/user-role.enum';

type RegisterDtoRequestType = Omit<UserDto, 'id'>;

export class RegisterRequestDto implements RegisterDtoRequestType {
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
