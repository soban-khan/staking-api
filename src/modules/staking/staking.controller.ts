import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StakingService } from './staking.service';
import { CreateStakingDto } from './dto/create-staking.dto';
import { UpdateStakingDto } from './dto/update-staking.dto';

@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Post()
  create(@Body() createStakingDto: CreateStakingDto) {
    return this.stakingService.create(createStakingDto);
  }

  @Get()
  findAll() {
    return this.stakingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stakingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStakingDto: UpdateStakingDto) {
    return this.stakingService.update(+id, updateStakingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stakingService.remove(+id);
  }
}
