import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { WarehouseProductService } from './warehouse-product.service';
import { WarehouseProductResponseDto } from './dto/response/response.dto';
import { WarehouseProductRequestDto } from './dto/request/request.dto';

@Controller('warehouse-product')
export class WarehouseProductController {
  constructor(private readonly warehouseProductService: WarehouseProductService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.warehouseProductService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<WarehouseProductResponseDto[]> {
    return await this.warehouseProductService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WarehouseProductResponseDto | undefined> {
    return await this.warehouseProductService.getById(id);
  }

  @Get('product/:productId')
  @HttpCode(200)
  async getByProduct(@Param('productId') productId: string): Promise<WarehouseProductResponseDto[]> {
    return await this.warehouseProductService.getByProduct(productId);
  }

  @Get('warehouse/:warehouseId')
  @HttpCode(200)
  async getByWarehouse(@Param('warehouseId') warehouseId: string): Promise<WarehouseProductResponseDto[]> {
    return await this.warehouseProductService.getByWarehouse(warehouseId);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.warehouseProductService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.warehouseProductService.delete(id);
  }
}
