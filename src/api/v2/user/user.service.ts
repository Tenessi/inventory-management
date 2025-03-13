import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { UserRequestInput } from './inputs/request.input';
import { hash } from 'argon2';
import { UserModelFields } from 'src/common/types/models/user';

@Injectable()
export class UserService {
  constructor(private readonly repository: Repository) {}

  async create(input: UserRequestInput): Promise<UserModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      const oldUser = await this.repository.user.getByEmail(input.email, transaction);

      if (oldUser) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }

      return await this.repository.user.create({ ...input, password: await hash(input.password) }, transaction);
    });
  }

  async getAll(): Promise<UserModelFields[]> {
    return await this.repository.user.getAll();
  }

  async getById(id: string): Promise<UserModelFields | undefined> {
    return await this.repository.user.getById(id);
  }

  async update(id: string, input: UserRequestInput): Promise<UserModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      const user = await this.repository.user.getById(id, transaction);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      return await this.repository.user.update(id, { ...input, password: await hash(input.password) }, transaction);
    });
  }

  async delete(id: string): Promise<boolean> {
    return await this.repository.withTransaction(async (transaction) => {
      const user = await this.repository.user.getById(id, transaction);

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      await this.repository.user.delete(id, transaction);

      return true;
    });
  }
}
