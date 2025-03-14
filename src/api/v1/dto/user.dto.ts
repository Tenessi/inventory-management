import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class UserDto {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  id: string;

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
}
