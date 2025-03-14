import { UserRole } from 'src/shared/enums/user-role.enum';
import { UserDto } from '../../../dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

type UserRequestType = Omit<UserDto, 'id'>;

export class UserRequestDto implements UserRequestType {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: () => UserRole,
    enum: UserRole,
  })
  @IsEnum(UserRole)
  role: UserRole;

  constructor(name: string, email: string, password: string, role: UserRole) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
