import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { RewardHistory } from './entities/reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { StakingModule } from '../staking/staking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RewardHistory]),
    UserModule,
    StakingModule,
  ],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
