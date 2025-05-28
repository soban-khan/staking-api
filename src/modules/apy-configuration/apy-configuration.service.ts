import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateApyConfigDto } from './dto/create-apy-configuration.dto';
import { UpdateApyConfigDto } from './dto/update-apy-configuration.dto';
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

  async create(
    createApyConfigurationDto: CreateApyConfigDto,
  ): Promise<ApyConfiguration> {
    try {
      const res = await this.apyConfigRepository.save(
        createApyConfigurationDto,
      );
      return res;
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async findAll(): Promise<{ results: Array<object>; totalCount: number }> {
    try {
      const results = await this.apyConfigRepository.findAndCount({
        where: { isActive: true },
        order: { lockPeriodDays: 'ASC' },
      });
      return { results: results[0], totalCount: results[1] };
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async findOne(id: number) {
    try {
      const config = await this.apyConfigRepository.findOne({
        where: { id },
      });
      if (!config)
        throw new HttpException('No Such config', HttpStatus.NOT_FOUND);

      return config;
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async update(id: number, updateApyConfigurationDto: UpdateApyConfigDto) {
    try {
      const configToUpdate = await this.apyConfigRepository.findOne({
        where: { id },
      });
      if (!configToUpdate)
        throw new HttpException(
          `APY configuration with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );

      await this.apyConfigRepository.update(id, updateApyConfigurationDto);
      return {};
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }

  async remove(id: number) {
    try {
      const deletedConfig = await this.apyConfigRepository.delete(id);
      if (!deletedConfig.affected)
        throw new HttpException(
          `APY configuration with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );

      return {};
    } catch (error) {
      if (error.status)
        throw new HttpException(error.message, error.getStatus());
      else
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
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
