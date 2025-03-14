import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRequestDto } from './dto/request/request.dto';
import { ProductResponseDto } from './dto/response/response.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';

@Auth()
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
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

  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Patch(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() dto: ProductRequestDto): Promise<ProductResponseDto> {
    return await this.productService.update(id, dto);
  }

  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.delete(id);
  }
}
