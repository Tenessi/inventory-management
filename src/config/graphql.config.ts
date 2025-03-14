import { ConfigService } from '@nestjs/config';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export function getGraphQLConfig(configService: ConfigService): ApolloDriverConfig {
  return {
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/db/graphql/schema.gql'),
    sortSchema: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    context: ({ req, res }) => ({ req, res }),
  };
}
