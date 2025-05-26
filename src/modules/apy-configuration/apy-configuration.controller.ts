import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApyConfigurationService } from './apy-configuration.service';
import { CreateApyConfigurationDto } from './dto/create-apy-configuration.dto';
import { UpdateApyConfigurationDto } from './dto/update-apy-configuration.dto';

@Controller('apy-configuration')
export class ApyConfigurationController {
  constructor(private readonly apyConfigurationService: ApyConfigurationService) {}

  @Post()
  create(@Body() createApyConfigurationDto: CreateApyConfigurationDto) {
    return this.apyConfigurationService.create(createApyConfigurationDto);
  }

  @Get()
  findAll() {
    return this.apyConfigurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apyConfigurationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApyConfigurationDto: UpdateApyConfigurationDto) {
    return this.apyConfigurationService.update(+id, updateApyConfigurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apyConfigurationService.remove(+id);
  }
}
