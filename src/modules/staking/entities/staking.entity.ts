import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { StakingStatus } from 'src/constants/app.constants';
import { User } from 'src/modules/user/entities/user.entity';
import { ApyConfiguration } from 'src/modules/apy-configuration/entities/apy-configuration.entity';
import { RewardHistory } from 'src/modules/reward/entities/reward.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';

@Entity('staking_positions')
export class StakingPosition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  apyConfigId: number;

  @Column('decimal', { precision: 18, scale: 8 })
  stakedAmount: number;

  @Column()
  lockPeriodDays: number;

  @Column('decimal', { precision: 5, scale: 2 })
  apyRate: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  stakeDate: Date;

  @Column('timestamp')
  unlockDate: Date;

  @Column({
    type: 'enum',
    enum: StakingStatus,
    default: StakingStatus.ACTIVE,
  })
  status: StakingStatus;

  @Column('timestamp', { nullable: true })
  unstakeInitiatedAt: Date;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  totalRewardsEarned: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  lastRewardCalculatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.stakingPositions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => ApyConfiguration, (config) => config.stakingPositions)
  @JoinColumn({ name: 'apyConfigId' })
  apyConfig: ApyConfiguration;

  @OneToMany(() => RewardHistory, (reward) => reward.position)
  rewardHistory: RewardHistory[];

  @OneToMany(() => Transaction, (transaction) => transaction.position)
  transactions: Transaction[];
}
