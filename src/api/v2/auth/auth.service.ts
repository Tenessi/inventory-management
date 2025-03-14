import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'src/db/repositories/repository';
import { LoginRequestInput } from './inputs/request/login.input';
import * as argon2 from 'argon2';
import { hash } from 'argon2';
import { AuthResponseInput } from './inputs/response/response.input';
import { RegisterRequestInput } from './inputs/request/register.input';
import { User } from 'src/common/interfaces/user/user.interface';
import { Response } from 'express';
import { IssueTokensResponseInput } from './inputs/response/issue-tokens.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly repository: Repository,
  ) {}

  async login(input: LoginRequestInput, res: Response): Promise<AuthResponseInput> {
    const user = await this.repository.user.getByEmail(input.email);

    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }

    const isValidPassword = await argon2.verify(user.password, input.password);

    if (!isValidPassword) {
      throw new ConflictException('Неверный пароль');
    }

    return this.handleSuccessfulLogin(user, res);
  }

  async register(input: RegisterRequestInput, res: Response): Promise<AuthResponseInput> {
    return await this.repository.withTransaction(async (transaction) => {
      const oldUser = await this.repository.user.getByEmail(input.email, transaction);

      if (oldUser) {
        throw new NotFoundException('Пользователь с таким email уже существует');
      }

      const user = await this.repository.user.create({ ...input, password: await hash(input.password) }, transaction);

      return this.handleSuccessfulLogin(user, res);
    });
  }

  private handleSuccessfulLogin(user: User, res: Response): AuthResponseInput {
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

  private issueTokens(userId: string): IssueTokensResponseInput {
    const data = { id: userId };

    const accessToken =
      'Bearer ' +
      this.jwtService.sign(data, {
        expiresIn: this.configService.get<string>('EXPIRE_DAY_ACCESS_TOKEN'),
      });

    const refreshToken =
      'Bearer ' +
      this.jwtService.sign(data, {
        expiresIn: this.configService.get<string>('EXPIRE_DAY_REFRESH_TOKEN'),
      });

    return { accessToken, refreshToken };
  }
}
