import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const modules = [UserModule, AuthModule];

@Module({
  imports: modules,
})
export class ApiV1Module {}
