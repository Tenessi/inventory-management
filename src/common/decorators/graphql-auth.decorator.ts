import { UseGuards } from '@nestjs/common';
import { GraphQLJwtAuthGuard } from '../guards/graphql-auth.guard';

export const GraphQLAuth = () => UseGuards(GraphQLJwtAuthGuard);
