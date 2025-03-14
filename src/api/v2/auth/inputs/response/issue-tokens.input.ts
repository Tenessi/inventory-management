import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IssueTokensResponseInput {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
