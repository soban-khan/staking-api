import { PartialType } from '@nestjs/mapped-types';
import { CreateApyConfigurationDto } from './create-apy-configuration.dto';

export class UpdateApyConfigurationDto extends PartialType(CreateApyConfigurationDto) {}
