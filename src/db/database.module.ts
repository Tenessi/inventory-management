import { Module } from '@nestjs/common';
import { Repository } from './repositories/repository';
import { RepositoriesModule } from './repositories/repository.module';

@Module({
  imports: [RepositoriesModule],
  providers: [Repository],
  exports: [Repository],
})
export class DatabaseModule {}
