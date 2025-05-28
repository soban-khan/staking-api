import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApyConfigurationService } from './apy-configuration.service';
import { CreateApyConfigDto } from './dto/create-apy-configuration.dto';
import { UpdateApyConfigDto } from './dto/update-apy-configuration.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('apy-config')
export class ApyConfigurationController {
  constructor(private readonly apyConfigService: ApyConfigurationService) {}

  @Post()
  @ApiOperation({ summary: 'Create new APY configuration (Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'APY configuration created successfully',
  })
  create(@Body() createApyConfigDto: CreateApyConfigDto) {
    return this.apyConfigService.create(createApyConfigDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all APY configurations' })
  @ApiResponse({
    status: 200,
    description: 'APY configurations retrieved successfully',
  })
  findAll() {
    return this.apyConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apyConfigService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update APY configuration (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'APY configuration updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() updateApyConfigDto: UpdateApyConfigDto,
  ) {
    return this.apyConfigService.update(+id, updateApyConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apyConfigService.remove(+id);
  }
}
