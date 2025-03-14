import * as crypto from 'node:crypto';

import { FactoryProvider, Provider, ValueProvider, DynamicModule } from '@nestjs/common';
import { Knex, knex } from 'knex';

export type KnexConfigFactory =
  | Omit<FactoryProvider<Knex.Config>, 'provide'>
  | Omit<ValueProvider<Knex.Config>, 'provide'>;

export type KnexModuleOptions = {
  config: KnexConfigFactory;
};

export const KnexToken = Symbol('KNEX_INSTANCE');
const ModuleOptionsToken = Symbol('KNEX_MODULE_OPTIONS');
const KnexConfigToken = Symbol('KNEX_CONFIG');

const createOptionsProvider = (options: KnexModuleOptions): Provider => ({
  useValue: {
    _id: crypto.randomUUID(),
    ...options,
  },
  provide: ModuleOptionsToken,
});

const createConfigProvider = (config: KnexConfigFactory): Provider<Knex.Config> => ({
  provide: KnexConfigToken,
  ...config,
});

const createKnexProvider = (): Provider => ({
  provide: KnexToken,
  useFactory: (config: Knex.Config) => {
    return knex(config);
  },
  inject: [KnexConfigToken],
});

export class KnexModule {
  static register(options: KnexModuleOptions): DynamicModule {
    if (!options) throw new Error('options must be provided');

    const moduleOptionsProvider = createOptionsProvider(options);
    const knexConfigPtovider = createConfigProvider(options.config);
    const knexProvider = createKnexProvider();

    return {
      module: KnexModule,
      providers: [knexProvider, moduleOptionsProvider, knexConfigPtovider],
      exports: [knexProvider],
    };
  }
}
