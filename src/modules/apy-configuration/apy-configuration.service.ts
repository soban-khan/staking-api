import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApyConfigurationDto } from './dto/create-apy-configuration.dto';
import { UpdateApyConfigurationDto } from './dto/update-apy-configuration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ApyConfiguration } from './entities/apy-configuration.entity';
import {
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Or,
  Repository,
} from 'typeorm';

@Injectable()
export class ApyConfigurationService {
  constructor(
    @InjectRepository(ApyConfiguration)
    private apyConfigRepository: Repository<ApyConfiguration>,
  ) {}

  create(createApyConfigurationDto: CreateApyConfigurationDto) {
    return 'This action adds a new apyConfiguration';
  }

  findAll() {
    return `This action returns all apyConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apyConfiguration`;
  }

  update(id: number, updateApyConfigurationDto: UpdateApyConfigurationDto) {
    return `This action updates a #${id} apyConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} apyConfiguration`;
  }

  async findByLockPeriod(lockPeriodDays: number): Promise<ApyConfiguration> {
    const now = new Date();
    const config = await this.apyConfigRepository.findOne({
      where: {
        lockPeriodDays,
        isActive: true,
        effectiveFrom: LessThanOrEqual(now),
        effectiveUntil: Or(MoreThanOrEqual(now), IsNull()),
      },
      order: { effectiveFrom: 'DESC' },
    });

    if (!config) {
      throw new NotFoundException(
        `No APY configuration found for ${lockPeriodDays} days lock period`,
      );
    }

    return config;
  }
}
