import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { TransactionRequestDto } from './dto/request/request.dto';
import { TransactionResponseDto } from './dto/response/response.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly repository: Repository) {}

  async create(dto: TransactionRequestDto, userId: string): Promise<TransactionResponseDto> {
    return await this.repository.transaction.create({ ...dto, userId });
  }

  async getAll(): Promise<TransactionResponseDto[]> {
    return await this.repository.transaction.getAll();
  }

  async getById(id: string): Promise<TransactionResponseDto | undefined> {
    return await this.repository.transaction.getById(id);
  }

  async getByWarehouseProduct(warehouseProductId: string): Promise<TransactionResponseDto[]> {
    return await this.repository.transaction.getByWarehouseProduct(warehouseProductId);
  }

  async delete(id: string): Promise<void> {
    return await this.repository.withTransaction(async (transaction) => {
      const transactionData = await this.repository.transaction.getById(id);

      if (!transactionData) {
        throw new NotFoundException('Транзакция не найдена');
      }

      await this.repository.transaction.delete(id, transaction);
    });
  }
}
