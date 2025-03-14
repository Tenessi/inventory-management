import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseResolver } from './warehouse.resolver';

@Module({
  providers: [WarehouseResolver, WarehouseService],
})
export class WarehouseModule {}
