import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { RewardHistory } from './entities/reward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RewardHistory])],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
