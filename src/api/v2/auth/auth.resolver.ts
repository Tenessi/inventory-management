import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthModel } from 'src/db/graphql/models/auth/auth.model';
import { LoginRequestInput } from './inputs/request/login.input';
import { AuthResponseInput } from './inputs/response/response.input';
import { RegisterRequestInput } from './inputs/request/register.input';
import { Response } from 'express';

interface GraphQLContext {
  res: Response;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel, { name: 'login' })
  async login(@Args('data') input: LoginRequestInput, @Context() context: GraphQLContext): Promise<AuthResponseInput> {
    const user = await this.authService.login(input, context.res);
    return user;
  }

  @Mutation(() => AuthModel, { name: 'register' })
  async register(
    @Args('data') input: RegisterRequestInput,
    @Context() context: GraphQLContext,
  ): Promise<AuthResponseInput> {
    return await this.authService.register(input, context.res);
  }
}
