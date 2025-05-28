import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { StakingService } from './staking.service';
import { CreateStakingDto, UnstakeDto } from './dto/create-staking.dto';
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
    return this.stakingService.stake(req.user.sub, createStakeDto);
  }

  @Post('unstake')
  @ApiOperation({ summary: 'Unstake tokens' })
  @ApiResponse({ status: 200, description: 'Tokens unstaked successfully' })
  @ApiResponse({ status: 404, description: 'Staking position not found' })
  unstake(@Request() req, @Body() unstakeDto: UnstakeDto) {
    return this.stakingService.unstake(req.user.sub, unstakeDto);
  }

  @Get('positions')
  @ApiOperation({ summary: 'Get user staking positions' })
  @ApiResponse({
    status: 200,
    description: 'User positions retrieved successfully',
  })
  getUserPositions(@Request() req) {
    return this.stakingService.findUserPositions(req.user.sub);
  }

  @Get('positions/:id')
  @ApiOperation({ summary: 'Get specific staking position' })
  @ApiResponse({ status: 200, description: 'Position retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Position not found' })
  getPosition(@Param('id') id: string) {
    return this.stakingService.findPosition(+id);
  }
}
