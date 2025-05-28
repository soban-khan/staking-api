import { Module } from '@nestjs/common';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StakingPosition } from './entities/staking.entity';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ApyConfigurationModule } from '../apy-configuration/apy-configuration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StakingPosition]),
    UserModule,
    TransactionModule,
    ApyConfigurationModule,
  ],
  controllers: [StakingController],
  providers: [StakingService],
  exports: [StakingService],
})
export class StakingModule {}
