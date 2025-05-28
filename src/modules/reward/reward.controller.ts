import { Controller, Get, Param, Request } from '@nestjs/common';
import { RewardService } from './reward.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('pending')
  @ApiOperation({ summary: 'Get user pending rewards' })
  @ApiResponse({
    status: 200,
    description: 'Pending rewards retrieved successfully',
  })
  getPendingRewards(@Request() req) {
    return this.rewardService.getUserPendingRewards(req.user.sub);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get user reward history' })
  @ApiResponse({
    status: 200,
    description: 'Reward history retrieved successfully',
  })
  getRewardHistory(@Request() req) {
    return this.rewardService.getUserRewardHistory(req.user.sub);
  }

  @Get('position/:id')
  @ApiOperation({ summary: 'Get pending rewards for specific position' })
  @ApiResponse({
    status: 200,
    description: 'Position rewards retrieved successfully',
  })
  async getPositionRewards(@Param('id') id: string) {
    const pendingRewards =
      await this.rewardService.calculatePendingRewards(+id);
    return { positionId: +id, pendingRewards };
  }
}
