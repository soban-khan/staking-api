import { Injectable } from '@nestjs/common';
import { CreateStakingDto } from './dto/create-staking.dto';
import { UpdateStakingDto } from './dto/update-staking.dto';

@Injectable()
export class StakingService {
  create(createStakingDto: CreateStakingDto) {
    return 'This action adds a new staking';
  }

  findAll() {
    return `This action returns all staking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staking`;
  }

  update(id: number, updateStakingDto: UpdateStakingDto) {
    return `This action updates a #${id} staking`;
  }

  remove(id: number) {
    return `This action removes a #${id} staking`;
  }
}
