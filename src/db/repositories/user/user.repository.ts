import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/db/models/user/user.model';
import { UserInput, UserUpdateInput } from './user.types';
import { Transaction } from 'objection';
import { UserModelFields } from 'src/common/types/models/user';

@Injectable()
export class UserRepository {
  constructor(@Inject(UserModel.name) private readonly userModel: typeof UserModel) {}

  async create(input: UserInput, transaction?: Transaction): Promise<UserModelFields> {
    return await this.userModel.query(transaction).insert(input);
  }

  async getAll(transaction?: Transaction): Promise<UserModelFields[]> {
    return await this.userModel.query(transaction);
  }

  async getById(id: string, transaction?: Transaction): Promise<UserModelFields | undefined> {
    return await this.userModel.query(transaction).findById(id);
  }

  async getByEmail(email: string, transaction?: Transaction): Promise<UserModelFields | undefined> {
    return await this.userModel.query(transaction).findOne({ email });
  }

  async update(id: string, input: UserUpdateInput, transaction?: Transaction): Promise<UserModelFields> {
    return await this.userModel.query(transaction).patchAndFetchById(id, input);
  }

  async delete(id: string, transaction?: Transaction): Promise<void> {
    await this.userModel.query(transaction).deleteById(id);
  }
}
