import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/response/response.dto';
import { UserRequestDto } from './dto/request/request.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';

@Auth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Role(UserRole.ADMIN)
  @Post()
  @HttpCode(201)
  async create(@Body() dto: UserRequestDto): Promise<UserResponseDto> {
    return await this.userService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<UserResponseDto[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<UserResponseDto | undefined> {
    return await this.userService.getById(id);
  }

  @Role(UserRole.ADMIN)
  @Patch(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() dto: UserRequestDto): Promise<UserResponseDto> {
    return await this.userService.update(id, dto);
  }

  @Role(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
