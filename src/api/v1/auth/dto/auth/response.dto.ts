import { User } from 'src/common/interfaces/user/user.interface';

export class AuthResponseDto {
  user: User;
  accessToken: string;
}
