import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

const modules = [UserModule];

@Module({
  imports: modules,
})
export class ApiV1Module {}
