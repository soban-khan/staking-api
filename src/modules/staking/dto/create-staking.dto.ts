import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsInt, Min } from 'class-validator';

export class CreateStakingDto {
  @ApiProperty({ example: 1000, description: 'Amount to stake' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 30, description: 'Lock period in days' })
  @IsInt()
  @Min(1)
  lockPeriodDays: number;
}

export class UnstakeDto {
  @ApiProperty({ example: 1, description: 'Staking position ID' })
  @IsInt()
  @IsPositive()
  positionId: number;
}
