import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'src/db/repositories/repository';
import { TransactionRequestInput } from './inputs/request.input';
import { TransactionModelFields } from 'src/common/types/models/transaction';
import { TransactionType } from 'src/shared/enums/transaction-type.enum';
import { Transaction } from 'objection';

@Injectable()
export class TransactionService {
  constructor(private readonly repository: Repository) {}

  async incoming(input: TransactionRequestInput, userId: string): Promise<TransactionModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      this.validateQuantityIsPositive(input.quantity);
      const { warehouse, warehouseProducts } = await this.getWarehouseData(input, transaction);

      const warehouseQuantity = await this.repository.product.getProductsQuantityByWarehouse(input.warehouseId);
      const potencialWarehouseQuantity = warehouseQuantity + input.quantity;

      if (warehouse.capacity < potencialWarehouseQuantity) {
        throw new ConflictException('Недостаточно места для товара на складе');
      }

      if (warehouseProducts.length === 0) {
        await this.repository.warehouseProduct.create(input, transaction);
      } else {
        await this.repository.warehouseProduct.update(
          warehouseProducts[0].id,
          {
            quantity: warehouseProducts[0].quantity + input.quantity,
          },
          transaction,
        );
      }

      const dataToCreate = {
        ...input,
        type: TransactionType.INCOMING,
        userId,
        date: input.date,
      };

      return await this.repository.transaction.create(dataToCreate, transaction);
    });
  }

  async outgoing(input: TransactionRequestInput, userId: string): Promise<TransactionModelFields> {
    return await this.repository.withTransaction(async (transaction) => {
      this.validateQuantityIsPositive(input.quantity);
      const { warehouseProducts } = await this.getWarehouseData(input, transaction);

      const productsQuantity = warehouseProducts.reduce((acc, item) => acc + item.quantity, 0);

      if (productsQuantity < input.quantity) {
        throw new ConflictException('Количество товаров не может быть больше, чем есть на складе');
      }

      await this.repository.warehouseProduct.update(
        warehouseProducts[0].id,
        {
          quantity: warehouseProducts[0].quantity - input.quantity,
        },
        transaction,
      );

      return await this.repository.transaction.create(
        { ...input, type: TransactionType.OUTGOING, userId },
        transaction,
      );
    });
  }

  async getAll(): Promise<TransactionModelFields[]> {
    return await this.repository.transaction.getAll();
  }

  private async getWarehouseData(input: TransactionRequestInput, transaction: Transaction) {
    const [warehouse, warehouseProducts] = await Promise.all([
      this.repository.warehouse.getById(input.warehouseId, transaction),
      this.repository.warehouseProduct.getByProduct(input.productId, transaction),
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
