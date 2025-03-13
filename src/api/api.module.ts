import { Module } from '@nestjs/common';
import { ApiV1Module } from './v1/api.v1.module';
import { ApiV2Module } from './v2/api.v2.module';

const modules = [ApiV1Module, ApiV2Module];

@Module({
  imports: modules,
})
export class ApiModule {}
