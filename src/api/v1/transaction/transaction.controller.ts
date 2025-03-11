import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResponseDto } from './dto/response/response.dto';
import { TransactionRequestDto } from './dto/request/request.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';

@Auth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: TransactionRequestDto, @CurrentUser('id') userId: string) {
    return await this.transactionService.create(dto, userId);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<TransactionResponseDto[]> {
    return await this.transactionService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<TransactionResponseDto | undefined> {
    return await this.transactionService.getById(id);
  }

  @Get('warehouse-product/:warehouseProductId')
  @HttpCode(200)
  async getByWarehouseProduct(
    @Param('warehouseProductId') warehouseProductId: string,
  ): Promise<TransactionResponseDto[]> {
    return await this.transactionService.getByWarehouseProduct(warehouseProductId);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.transactionService.delete(id);
  }
}
