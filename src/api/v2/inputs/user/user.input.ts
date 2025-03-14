import { InputType } from '@nestjs/graphql';
import { UserModel } from 'src/db/graphql/models/user/user.model';

@InputType()
export class UserInput extends UserModel {}
