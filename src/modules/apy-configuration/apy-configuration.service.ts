import { Injectable } from '@nestjs/common';
import { CreateApyConfigurationDto } from './dto/create-apy-configuration.dto';
import { UpdateApyConfigurationDto } from './dto/update-apy-configuration.dto';

@Injectable()
export class ApyConfigurationService {
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
}
