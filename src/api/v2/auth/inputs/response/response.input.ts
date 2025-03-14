import { Field, InputType } from '@nestjs/graphql';
import { UserModel } from 'src/db/graphql/models/user/user.model';

@InputType()
export class AuthResponseInput {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  accessToken: string;
}
