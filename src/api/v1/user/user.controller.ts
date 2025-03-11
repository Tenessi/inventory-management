import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/response.dto';
import { UserRequestDto } from './dto/request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }
}
