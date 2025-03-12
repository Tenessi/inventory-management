import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRequestDto } from './dto/request/request.dto';
import { ProductResponseDto } from './dto/response/response.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: ProductRequestDto): Promise<ProductResponseDto> {
    return await this.productService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<ProductResponseDto[]> {
    return await this.productService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<ProductResponseDto | undefined> {
    return await this.productService.getById(id);
  }

  @Get('warehouse/:warehouseId')
  @HttpCode(200)
  async getQuantityByWarehouse(@Param('warehouseId') warehouseId: string): Promise<number> {
    return await this.productService.getQuantityByWarehouse(warehouseId);
  }

  @Patch(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() dto: ProductRequestDto): Promise<ProductResponseDto> {
    return await this.productService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.delete(id);
  }
}
