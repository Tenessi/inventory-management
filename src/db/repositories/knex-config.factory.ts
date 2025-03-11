import { ConfigService } from '@nestjs/config';
import { KnexConfigFactory } from '../knex/knex.module';

export const KnexFactory: KnexConfigFactory = {
  useFactory: (configService: ConfigService) => {
    return {
      client: configService.get<string>('DB_CLIENT'),
      connection: {
        database: configService.get<string>('DB_NAME'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        host: configService.get<string>('DB_HOST'),
      },
      pool: {
        min: 2,
        max: 10,
      },
    };
  },
  inject: [ConfigService],
};
