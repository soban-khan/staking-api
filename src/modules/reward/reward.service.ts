import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RewardHistory } from './entities/reward.entity';
import { Repository } from 'typeorm';
import { StakingService } from '../staking/staking.service';
import { UserService } from '../user/user.service';
import { RewardType, StakingStatus } from 'src/constants/app.constants';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(RewardHistory)
    private rewardHistoryRepository: Repository<RewardHistory>,
    private stakingService: StakingService,
    private usersService: UserService,
  ) {}

  async getUserPendingRewards(userId: number): Promise<number> {
    const positions = await this.stakingService.findUserPositions(userId);
    let totalPendingRewards = 0;

    for (const position of positions) {
      if (position.status === StakingStatus.ACTIVE) {
        const pendingRewards = await this.calculatePendingRewards(position.id);
        totalPendingRewards += pendingRewards;
      }
    }

    return totalPendingRewards;
  }

  async calculatePendingRewards(positionId: number): Promise<number> {
    const position = await this.stakingService.findPosition(positionId);

    if (position.status !== StakingStatus.ACTIVE) {
      return 0;
    }

    const now = new Date();
    const lastCalculated = position.lastRewardCalculatedAt;
    const daysSinceLastCalculation = Math.floor(
      (now.getTime() - lastCalculated.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysSinceLastCalculation === 0) {
      return 0;
    }

    const dailyReward = this.calculateDailyReward(
      position.stakedAmount,
      position.apyRate,
    );
    return dailyReward * daysSinceLastCalculation;
  }

  calculateDailyReward(stakedAmount: number, apyRate: number): number {
    // Daily reward = (Staked Amount × APY Rate) / 365
    return (stakedAmount * (apyRate / 100)) / 365;
  }

  async getUserRewardHistory(userId: number): Promise<RewardHistory[]> {
    return this.rewardHistoryRepository
      .createQueryBuilder('reward')
      .leftJoinAndSelect('reward.position', 'position')
      .where('position.userId = :userId', { userId })
      .orderBy('reward.calculationDate', 'DESC')
      .getMany();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async calculateDailyRewards(): Promise<void> {
    console.log('Starting daily reward calculation...');

    const activePositions = await this.stakingService.findActivePositions();

    for (const position of activePositions) {
      try {
        const dailyReward = this.calculateDailyReward(
          position.stakedAmount,
          position.apyRate,
        );
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if reward already calculated for today
        const existingReward = await this.rewardHistoryRepository.findOne({
          where: {
            positionId: position.id,
            calculationDate: today,
          },
        });

        if (!existingReward) {
          const rewardHistory = this.rewardHistoryRepository.create({
            positionId: position.id,
            rewardAmount: dailyReward,
            calculationDate: today,
            rewardType: RewardType.DAILY,
            apyRateUsed: position.apyRate,
            daysStaked:
              Math.floor(
                (today.getTime() - position.stakeDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              ) + 1,
          });

          await this.rewardHistoryRepository.save(rewardHistory);

          position.totalRewardsEarned += dailyReward;
          position.lastRewardCalculatedAt = new Date();
          await this.stakingService.findPosition(position.id); // This will update the position

          const user = position.user;
          await this.usersService.updateBalances(user.id, {
            totalRewards: user.totalRewards + dailyReward,
          });
        }
      } catch (error) {
        console.error(
          `Error calculating rewards for position ${position.id}:`,
          error,
        );
      }
    }

    console.log('Daily reward calculation completed');
  }
}
