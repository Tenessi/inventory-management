import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { WarehouseProductService } from './warehouse-product.service';
import { WarehouseProductResponseDto } from './dto/response/response.dto';
import { WarehouseProductRequestDto } from './dto/request/request.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Auth()
@Controller('warehouse-product')
export class WarehouseProductController {
  constructor(private readonly warehouseProductService: WarehouseProductService) {}

  @ApiCreatedResponse({
    type: WarehouseProductResponseDto,
  })
  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Post()
  @HttpCode(201)
  async create(@Body() dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.warehouseProductService.create(dto);
  }

  @ApiOkResponse({
    type: [WarehouseProductResponseDto],
  })
  @Get()
  @HttpCode(200)
  async getAll(): Promise<WarehouseProductResponseDto[]> {
    return await this.warehouseProductService.getAll();
  }

  @ApiOkResponse({
    type: [WarehouseProductResponseDto],
  })
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WarehouseProductResponseDto | undefined> {
    return await this.warehouseProductService.getById(id);
  }

  @ApiOkResponse({
    type: [WarehouseProductResponseDto],
  })
  @Get('product/:productId')
  @HttpCode(200)
  async getByProduct(@Param('productId') productId: string): Promise<WarehouseProductResponseDto[]> {
    return await this.warehouseProductService.getByProduct(productId);
  }

  @ApiOkResponse({
    type: [WarehouseProductResponseDto],
  })
  @Get('warehouse/:warehouseId')
  @HttpCode(200)
  async getByWarehouse(@Param('warehouseId') warehouseId: string): Promise<WarehouseProductResponseDto[]> {
    return await this.warehouseProductService.getByWarehouse(warehouseId);
  }

  @ApiCreatedResponse({
    type: WarehouseProductResponseDto,
  })
  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Patch(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: WarehouseProductRequestDto): Promise<WarehouseProductResponseDto> {
    return await this.warehouseProductService.update(id, dto);
  }

  @ApiNoContentResponse()
  @Role(UserRole.ADMIN, UserRole.ACCOUNTANT)
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.warehouseProductService.delete(id);
  }
}
