import { Module } from '@nestjs/common';
import { ApyConfigurationService } from './apy-configuration.service';
import { ApyConfigurationController } from './apy-configuration.controller';
import { ApyConfiguration } from './entities/apy-configuration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ApyConfiguration])],
  controllers: [ApyConfigurationController],
  providers: [ApyConfigurationService],
})
export class ApyConfigurationModule {}
