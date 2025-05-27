import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStakingDto, UnstakeDto } from './dto/create-staking.dto';
import { UpdateStakingDto } from './dto/update-staking.dto';
import { StakingPosition } from './entities/staking.entity';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { StakingStatus, TransactionType } from 'src/constants/app.constants';
import { TransactionService } from '../transaction/transaction.service';
import { ApyConfigurationService } from '../apy-configuration/apy-configuration.service';
import { Repository } from 'typeorm';

@Injectable()
export class StakingService {
  constructor(
    private readonly usersService: UserService,
    private readonly transactionsService: TransactionService,
    private readonly apyConfigService: ApyConfigurationService,
    @InjectRepository(StakingPosition)
    private readonly stakingRepository: Repository<StakingPosition>,
  ) {}

  async stake(
    userId: number,
    createStakeDto: CreateStakingDto,
  ): Promise<StakingPosition> {
    try {
      const user = await this.usersService.findOne(userId);

      if (user.availableBalance < createStakeDto.amount) {
        throw new BadRequestException('Insufficient available balance');
      }

      const apyConfig = await this.apyConfigService.findByLockPeriod(
        createStakeDto.lockPeriodDays,
      );
      if (createStakeDto.amount < apyConfig.minStakeAmount) {
        throw new BadRequestException(
          `Minimum stake amount is ${apyConfig.minStakeAmount}`,
        );
      }

      const stakeDate = new Date();
      const unlockDate = new Date(stakeDate);
      unlockDate.setDate(unlockDate.getDate() + createStakeDto.lockPeriodDays);

      const savedPosition = await this.stakingRepository.save({
        userId,
        apyConfigId: apyConfig.id,
        stakedAmount: createStakeDto.amount,
        lockPeriodDays: createStakeDto.lockPeriodDays,
        apyRate: apyConfig.apyRate,
        stakeDate,
        unlockDate,
        status: StakingStatus.ACTIVE,
      });

      await this.usersService.updateBalances(userId, {
        availableBalance: user.availableBalance - createStakeDto.amount,
        stakedBalance: user.stakedBalance + createStakeDto.amount,
      });

      await this.transactionsService.createTransaction({
        userId,
        positionId: savedPosition.id,
        transactionType: TransactionType.STAKE,
        amount: createStakeDto.amount,
      });

      return savedPosition;
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async unstake(
    userId: number,
    unstakeDto: UnstakeDto,
  ): Promise<StakingPosition> {
    try {
      const position = await this.stakingRepository.findOne({
        where: { id: unstakeDto.positionId, userId },
        relations: ['user'],
      });
      if (!position) {
        throw new NotFoundException('Staking position not found');
      }
      if (position.status !== StakingStatus.ACTIVE) {
        throw new BadRequestException('Position is not active');
      }

      // Check if unlock date has passed
      const now = new Date();
      if (now < position.unlockDate) {
        throw new BadRequestException('Position is still locked');
      }

      position.status = StakingStatus.UNSTAKING;
      position.unstakeInitiatedAt = now;
      await this.stakingRepository.save(position);

      const user = position.user;
      await this.usersService.updateBalances(userId, {
        availableBalance:
          user.availableBalance +
          position.stakedAmount +
          position.totalRewardsEarned,
        stakedBalance: user.stakedBalance - position.stakedAmount,
      });

      await this.transactionsService.createTransaction({
        userId,
        positionId: position.id,
        transactionType: TransactionType.UNSTAKE,
        amount: position.stakedAmount + position.totalRewardsEarned,
      });

      position.status = StakingStatus.COMPLETED;
      return this.stakingRepository.save(position);
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  findAll() {
    return `This action returns all staking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staking`;
  }

  update(id: number, updateStakingDto: UpdateStakingDto) {
    return `This action updates a #${id} staking`;
  }

  remove(id: number) {
    return `This action removes a #${id} staking`;
  }
}
