import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseRequestDto } from './dto/request/request.dto';
import { WarehouseResponseDto } from './dto/response/response.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@Auth()
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiCreatedResponse({
    type: WarehouseResponseDto,
  })
  @Post()
  @HttpCode(201)
  async create(@Body() dto: WarehouseRequestDto): Promise<WarehouseResponseDto> {
    return await this.warehouseService.create(dto);
  }

  @ApiOkResponse({
    type: [WarehouseResponseDto],
  })
  @Get()
  @HttpCode(200)
  async getAll(): Promise<WarehouseResponseDto[]> {
    return await this.warehouseService.getAll();
  }

  @ApiOkResponse({
    type: [WarehouseResponseDto],
  })
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<WarehouseResponseDto | undefined> {
    return await this.warehouseService.getById(id);
  }

  @ApiCreatedResponse({
    type: WarehouseResponseDto,
  })
  @Patch(':id')
  @HttpCode(201)
  async update(@Param('id') id: string, @Body() dto: WarehouseRequestDto): Promise<WarehouseResponseDto> {
    return await this.warehouseService.update(id, dto);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.warehouseService.delete(id);
  }
}
