import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/auth/login/request.dto';
import { AuthResponseDto } from './dto/auth/response.dto';
import { Response } from 'express';
import { RegisterRequestDto } from './dto/auth/register/request.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    type: AuthResponseDto,
  })
  @Post('login')
  @HttpCode(201)
  async login(@Body() dto: LoginRequestDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    return await this.authService.login(dto, res);
  }

  @ApiCreatedResponse({
    type: AuthResponseDto,
  })
  @Post('register')
  @HttpCode(201)
  async register(@Body() dto: RegisterRequestDto, @Res({ passthrough: true }) res: Response): Promise<AuthResponseDto> {
    return await this.authService.register(dto, res);
  }
}
