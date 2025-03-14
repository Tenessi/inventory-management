import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserModelFields } from 'src/common/types/models/user';
import { UserRole } from 'src/shared/enums/user-role.enum';

@ObjectType()
export class UserModel implements UserModelFields {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  role: UserRole;
}
