import { Module } from '@nestjs/common';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakingPosition } from './entities/staking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StakingPosition])],
  controllers: [StakingController],
  providers: [StakingService],
})
export class StakingModule {}
