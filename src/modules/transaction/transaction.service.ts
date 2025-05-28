import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  createTransaction(payload: CreateTransactionDto) {
    return this.transactionRepository.save(payload);
  }

  async findUserTransactions(userId: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { userId },
      relations: ['position'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByType(
    userId: number,
    transactionType: string,
  ): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { userId, transactionType: transactionType as any },
      relations: ['position'],
      order: { createdAt: 'DESC' },
    });
  }
}
