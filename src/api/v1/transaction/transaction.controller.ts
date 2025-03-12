import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResponseDto } from './dto/response/response.dto';
import { TransactionRequestDto } from './dto/request/request.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';

@Auth()
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('incoming')
  @HttpCode(201)
  async incoming(
    @Body() dto: TransactionRequestDto,
    @CurrentUser('id') userId: string,
  ): Promise<TransactionResponseDto> {
    return await this.transactionService.incoming(dto, userId);
  }

  @Post('outgoing')
  @HttpCode(201)
  async outgoing(
    @Body() dto: TransactionRequestDto,
    @CurrentUser('id') userId: string,
  ): Promise<TransactionResponseDto> {
    return await this.transactionService.outgoing(dto, userId);
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<TransactionResponseDto[]> {
    return await this.transactionService.getAll();
  }
}
