import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { TransactionRequestDto } from './dto/request/request.dto';
import { TransactionResponseDto } from './dto/response/response.dto';
import { Transaction } from 'objection';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';

@Injectable()
export class TransactionService {
  constructor(private readonly repository: Repository) {}

  async incoming(dto: TransactionRequestDto, userId: string): Promise<TransactionResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      this.validateQuantityIsPositive(dto.quantity);
      const { warehouse, warehouseProducts } = await this.getWarehouseData(dto, transaction);

      const warehouseQuantity = await this.repository.product.getProductsQuantityByWarehouse(dto.warehouseId);
      const potencialWarehouseQuantity = warehouseQuantity + dto.quantity;

      if (warehouse.capacity < potencialWarehouseQuantity) {
        throw new ConflictException('Недостаточно места для товара на складе');
      }

      if (warehouseProducts.length === 0) {
        await this.repository.warehouseProduct.create(dto, transaction);
      } else {
        await this.repository.warehouseProduct.update(
          warehouseProducts[0].id,
          {
            quantity: warehouseProducts[0].quantity + dto.quantity,
          },
          transaction,
        );
      }

      const dataToCreate = {
        ...dto,
        type: TransactionType.INCOMING,
        userId,
        date: dto.date,
      };

      return await this.repository.transaction.create(dataToCreate, transaction);
    });
  }

  async outgoing(dto: TransactionRequestDto, userId: string): Promise<TransactionResponseDto> {
    return await this.repository.withTransaction(async (transaction) => {
      this.validateQuantityIsPositive(dto.quantity);
      const { warehouseProducts } = await this.getWarehouseData(dto, transaction);

      const productsQuantity = warehouseProducts.reduce((acc, item) => acc + item.quantity, 0);

      if (productsQuantity < dto.quantity) {
        throw new ConflictException('Количество товаров не может быть больше, чем есть на складе');
      }

      await this.repository.warehouseProduct.update(
        warehouseProducts[0].id,
        {
          quantity: warehouseProducts[0].quantity - dto.quantity,
        },
        transaction,
      );

      return await this.repository.transaction.create({ ...dto, type: TransactionType.OUTGOING, userId }, transaction);
    });
  }

  async getAll(): Promise<TransactionResponseDto[]> {
    return await this.repository.transaction.getAll();
  }

  private async getWarehouseData(dto: TransactionRequestDto, transaction: Transaction) {
    const [warehouse, warehouseProducts] = await Promise.all([
      this.repository.warehouse.getById(dto.warehouseId, transaction),
      this.repository.warehouseProduct.getByProduct(dto.productId, transaction),
    ]);

    if (!warehouse) {
      throw new NotFoundException('Склад не найден');
    }

    if (!warehouseProducts) {
      throw new NotFoundException('Продукты в складе не найдены');
    }

    return { warehouse, warehouseProducts };
  }

  private validateQuantityIsPositive(quantity: number) {
    if (quantity <= 0) {
      throw new ConflictException('Количество товаров должно быть больше 0');
    }
  }
}
