import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateApyConfigDto {
  @ApiProperty({ example: 30, description: 'Lock period in days' })
  @IsNumber()
  @IsPositive()
  lockPeriodDays: number;

  @ApiProperty({ example: 12.5, description: 'APY rate as percentage' })
  @IsNumber()
  @IsPositive()
  apyRate: number;

  @ApiProperty({ example: 100, description: 'Minimum stake amount' })
  @IsNumber()
  @IsPositive()
  minStakeAmount: number;

  @ApiProperty({
    example: 10000,
    description: 'Maximum stake amount',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxStakeAmount?: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Effective from date',
  })
  @IsDateString()
  effectiveFrom: string;

  @ApiProperty({
    example: '2024-12-31T23:59:59Z',
    description: 'Effective until date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  effectiveUntil?: string;

  @ApiProperty({
    example: true,
    description: 'Is configuration active',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
