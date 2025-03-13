import { InputType, OmitType } from '@nestjs/graphql';
import { UserInput } from 'src/api/v2/inputs/user/user.input';

@InputType()
export class UserRequestInput extends OmitType(UserInput, ['id']) {}
