import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from 'src/db/graphql/models/user/user.model';
import { UserRequestInput } from './inputs/request.input';
import { UserModelFields } from 'src/common/types/models/user';

@Resolver('Users')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserModel, { name: 'createUser' })
  async create(@Args('data') input: UserRequestInput): Promise<UserModelFields> {
    return await this.userService.create(input);
  }

  @Query(() => [UserModel], { name: 'getAllUsers' })
  async getAll(): Promise<UserModelFields[]> {
    return await this.userService.getAll();
  }

  @Query(() => UserModel, { name: 'getUserById' })
  async getById(@Args('id') id: string): Promise<UserModelFields | undefined> {
    return await this.userService.getById(id);
  }

  @Mutation(() => UserModel, { name: 'updateUser' })
  async update(@Args('id') id: string, @Args('data') input: UserRequestInput): Promise<UserModelFields> {
    return await this.userService.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.userService.delete(id);
  }
}
