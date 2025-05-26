import { Test, TestingModule } from '@nestjs/testing';
import { ApyConfigurationController } from './apy-configuration.controller';
import { ApyConfigurationService } from './apy-configuration.service';

describe('ApyConfigurationController', () => {
  let controller: ApyConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApyConfigurationController],
      providers: [ApyConfigurationService],
    }).compile();

    controller = module.get<ApyConfigurationController>(ApyConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
