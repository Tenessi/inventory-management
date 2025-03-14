import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IssueTokensResponseDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  refreshToken: string;
}
