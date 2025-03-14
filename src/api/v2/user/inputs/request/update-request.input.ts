import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { UserInput } from 'src/api/v2/inputs/user/user.input';
import { UserRole } from 'src/shared/enums/user-role.enum';

@InputType()
export class UserUpdateRequestInput extends PartialType(OmitType(UserInput, ['id'] as const)) {
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  password?: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}
