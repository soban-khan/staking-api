import { Module } from '@nestjs/common';
import { ApyConfigurationService } from './apy-configuration.service';
import { ApyConfigurationController } from './apy-configuration.controller';

@Module({
  controllers: [ApyConfigurationController],
  providers: [ApyConfigurationService],
})
export class ApyConfigurationModule {}
