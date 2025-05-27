import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { StakingService } from './staking.service';
import { CreateStakingDto, UnstakeDto } from './dto/create-staking.dto';
import { UpdateStakingDto } from './dto/update-staking.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Post('stake')
  @ApiOperation({ summary: 'Stake tokens' })
  @ApiResponse({ status: 201, description: 'Tokens staked successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request - insufficient balance or invalid parameters',
  })
  stake(@Request() req, @Body() createStakeDto: CreateStakingDto) {
    return this.stakingService.stake(req.user.id, createStakeDto);
  }

  @Post('unstake')
  @ApiOperation({ summary: 'Unstake tokens' })
  @ApiResponse({ status: 200, description: 'Tokens unstaked successfully' })
  @ApiResponse({ status: 404, description: 'Staking position not found' })
  async unstake(@Request() req, @Body() unstakeDto: UnstakeDto) {
    return this.stakingService.unstake(req.user.id, unstakeDto);
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
