import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './configs/typerom.config';
import { UserModule } from './modules/user/user.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ApyConfigurationModule } from './modules/apy-configuration/apy-configuration.module';
import { RewardModule } from './modules/reward/reward.module';
import { StakingModule } from './modules/staking/staking.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthenticationGuard } from './guards/authentication.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    UserModule,
    TransactionModule,
    ApyConfigurationModule,
    RewardModule,
    StakingModule,
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AppModule {}
