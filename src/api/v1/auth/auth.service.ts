import { ConfigService } from '@nestjs/config';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'src/db/repositories/repository';
import { IssueTokensResponseDto } from './dto/issue-tokens/response.dto';
import { Response } from 'express';
import { User } from 'src/common/interfaces/user/user.interface';
import { AuthResponseDto } from './dto/auth/response.dto';
import { RegisterRequestDto } from './dto/auth/register/request.dto';
import { hash } from 'argon2';
import { LoginRequestDto } from './dto/auth/login/request.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly repository: Repository,
  ) {}

  async login(dto: LoginRequestDto, res: Response): Promise<AuthResponseDto> {
    const user = await this.repository.user.getByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }

    const isValidPassword = await argon2.verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new ConflictException('Неверный пароль');
    }

    return this.handleSuccessfulLogin(user, res);
  }

  async register(dto: RegisterRequestDto, res: Response): Promise<AuthResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const oldUser = await this.repository.user.getByEmail(dto.email, transaction);

      if (oldUser) {
        throw new NotFoundException('Пользователь с таким email уже существует');
      }

      const user = await this.repository.user.create({ ...dto, password: await hash(dto.password) }, transaction);

      return this.handleSuccessfulLogin(user, res);
    });
  }

  private handleSuccessfulLogin(user: User, res: Response): AuthResponseDto {
    const { accessToken, refreshToken } = this.issueTokens(user.id);

    this.addRefreshRokenToResponse(res, refreshToken);

    return { user, accessToken };
  }

  private addRefreshRokenToResponse(res: Response, refreshToken: string): void {
    const expiresIn = new Date();

    expiresIn.setDate(expiresIn.getDate() + 7);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      expires: expiresIn,
      domain: this.configService.get<string>('DOMAIN'),
      sameSite: 'none',
    });
  }

  private issueTokens(userId: string): IssueTokensResponseDto {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: this.configService.get<string>('EXPIRE_DAY_ACCESS_TOKEN'),
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: this.configService.get<string>('EXPIRE_DAY_REFRESH_TOKEN'),
    });

    return { accessToken, refreshToken };
  }
}
