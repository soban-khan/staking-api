import { IsNumber, IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionType } from 'src/constants/app.constants';

export class CreateTransactionDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsNumber()
  positionId?: number;

  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  transactionHash?: string;
}
