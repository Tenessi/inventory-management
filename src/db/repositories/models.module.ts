import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { KnexFactory } from './knex-config.factory';
import { ModelProviders } from '../models';

@Module({
  imports: [KnexModule.register({ config: KnexFactory })],
  providers: ModelProviders,
  exports: [...ModelProviders, KnexModule],
})
export class ModelsModule {}
