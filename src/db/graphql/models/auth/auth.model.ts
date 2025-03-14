import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';

@ObjectType()
export class AuthModel {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  accessToken: string;
}
