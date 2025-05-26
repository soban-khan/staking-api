import { RewardType } from 'src/constants/app.constants';
import { StakingPosition } from 'src/modules/staking/entities/staking.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('reward_history')
export class RewardHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  positionId: number;

  @Column('decimal', { precision: 18, scale: 8 })
  rewardAmount: number;

  @Column('date')
  calculationDate: Date;

  @Column({
    type: 'enum',
    enum: RewardType,
    default: RewardType.DAILY,
  })
  rewardType: RewardType;

  @Column('decimal', { precision: 5, scale: 2 })
  apyRateUsed: number;

  @Column()
  daysStaked: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => StakingPosition, (position) => position.rewardHistory)
  @JoinColumn({ name: 'positionId' })
  position: StakingPosition;
}
