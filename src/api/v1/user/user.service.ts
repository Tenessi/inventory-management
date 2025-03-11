import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { hash } from 'argon2';
import { UserResponseDto } from './dto/response.dto';
import { UserRequestDto } from './dto/request.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: Repository) {}

  async create(dto: UserRequestDto): Promise<UserResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const oldUser = await this.repository.user.getByEmail(dto.email, transaction);

      if (oldUser) {
        throw new NotFoundException('Пользователь с таким email уже существует');
      }

      return await this.repository.user.create({ ...dto, password: await hash(dto.password) }, transaction);
    });
  }

  async getAll(): Promise<UserResponseDto[]> {
    return await this.repository.user.getAll();
  }

  async getById(id: string): Promise<UserResponseDto | undefined> {
    return await this.repository.user.getById(id);
  }

  async update(id: string, dto: UserRequestDto): Promise<UserResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      const user = await this.repository.user.getById(id, transaction);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      return await this.repository.user.update(id, dto, transaction);
    });
  }

  async delete(id: string): Promise<void> {
    return await this.repository.withTransaction(async (transaction) => {
      const user = await this.repository.user.getById(id, transaction);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      await this.repository.user.delete(id, transaction);
    });
  }
}
