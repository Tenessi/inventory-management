import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDto } from 'src/api/v1/dto/user.dto';
import { User } from 'src/common/interfaces/user/user.interface';

export class AuthResponseDto {
  @ApiProperty({
    type: () => UserDto,
  })
  user: User;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  accessToken: string;
}
