import { StakingPosition } from 'src/modules/staking/entities/staking.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('apy_configurations')
export class ApyConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lockPeriodDays: number;

  @Column('decimal', { precision: 5, scale: 2 })
  apyRate: number;

  @Column('decimal', { precision: 18, scale: 8, default: 0 })
  minStakeAmount: number;

  @Column('decimal', { precision: 18, scale: 8, nullable: true })
  maxStakeAmount: number;

  @Column('timestamp')
  effectiveFrom: Date;

  @Column('timestamp', { nullable: true })
  effectiveUntil: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => StakingPosition, (position) => position.apyConfig)
  stakingPositions: StakingPosition[];
}
