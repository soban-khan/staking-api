import { StakingPosition } from 'src/modules/staking/entities/staking.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true, length: 42 })
  walletAddress: string;

  @Column({ unique: true, length: 42 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  totalBalance: number;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  availableBalance: number;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  stakedBalance: number;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  totalRewards: number;

  @OneToMany(() => StakingPosition, (position) => position.user)
  stakingPositions: StakingPosition[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
