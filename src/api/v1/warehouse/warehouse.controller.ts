import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseRequestDto } from './dto/request/request.dto';
import { WarehouseResponseDto } from './dto/response/response.dto';

@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: WarehouseRequestDto): Promise<WarehouseResponseDto> {
    return await this.warehouseService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<WarehouseResponseDto[]> {
    return await this.warehouseService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WarehouseResponseDto | undefined> {
    return await this.warehouseService.getById(id);
  }

  @Patch(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() dto: WarehouseRequestDto): Promise<WarehouseResponseDto> {
    return await this.warehouseService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.warehouseService.delete(id);
  }
}
