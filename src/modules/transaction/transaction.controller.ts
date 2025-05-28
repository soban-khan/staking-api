import { Controller, Get, Param, Request } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Get user transactions' })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
  })
  getUserTransactions(@Request() req) {
    return this.transactionService.findUserTransactions(req.user.sub);
  }

  @Get('type/:type')
  @ApiOperation({
    summary: 'Get user transactions by type (stake, unstake, reward)',
  })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully',
  })
  getTransactionsByType(@Request() req, @Param('type') type: string) {
    return this.transactionService.findByType(req.user.sub, type);
  }
}
