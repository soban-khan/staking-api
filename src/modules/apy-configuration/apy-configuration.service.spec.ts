import { Test, TestingModule } from '@nestjs/testing';
import { ApyConfigurationService } from './apy-configuration.service';

describe('ApyConfigurationService', () => {
  let service: ApyConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApyConfigurationService],
    }).compile();

    service = module.get<ApyConfigurationService>(ApyConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
