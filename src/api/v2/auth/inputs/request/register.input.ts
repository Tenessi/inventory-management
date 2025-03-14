import { InputType } from '@nestjs/graphql';
import { UserCreateRequestInput } from 'src/api/v2/user/inputs/request/create-request.input';

@InputType()
export class RegisterRequestInput extends UserCreateRequestInput {}
