import { Module } from '@nestjs/common';
import { ApiV1Module } from './v1/api.v1.module';

const modules = [ApiV1Module];

@Module({
  imports: modules,
})
export class ApiModule {}
