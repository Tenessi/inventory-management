import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from 'src/db/graphql/models/user/user.model';
import { UserCreateRequestInput } from './inputs/request/create-request.input';
import { UserModelFields } from 'src/common/types/models/user';
import { UserUpdateRequestInput } from './inputs/request/update-request.input';
import { GraphQLAuth } from 'src/common/decorators/graphql-auth.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { Role } from 'src/common/decorators/user-role.decorator';

@GraphQLAuth()
@Resolver('Users')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Role(UserRole.ADMIN)
  @Mutation(() => UserModel, { name: 'createUser' })
  async create(@Args('data') input: UserCreateRequestInput): Promise<UserModelFields> {
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

  @Role(UserRole.ADMIN)
  @Mutation(() => UserModel, { name: 'updateUser' })
  async update(@Args('id') id: string, @Args('data') input: UserUpdateRequestInput): Promise<UserModelFields> {
    return await this.userService.update(id, input);
  }

  @Role(UserRole.ADMIN)
  @Mutation(() => Boolean, { name: 'deleteUser' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return await this.userService.delete(id);
  }
}
