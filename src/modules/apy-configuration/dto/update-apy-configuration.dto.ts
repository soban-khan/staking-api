import { PartialType } from '@nestjs/mapped-types';
import { CreateApyConfigDto } from './create-apy-configuration.dto';

export class UpdateApyConfigDto extends PartialType(CreateApyConfigDto) {}
