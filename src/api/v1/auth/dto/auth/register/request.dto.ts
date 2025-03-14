import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserDto } from 'src/api/v1/dto/user.dto';
import { UserRole } from 'src/shared/enums/user-role.enum';

type RegisterDtoRequestType = Omit<UserDto, 'id'>;

export class RegisterRequestDto implements RegisterDtoRequestType {
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
    type: 'string',
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
