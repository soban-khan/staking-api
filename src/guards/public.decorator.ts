import { SetMetadata } from '@nestjs/common';
import { publicMetadataDecoratorKey } from 'src/constants/app.constants';

export const Public = () => SetMetadata(publicMetadataDecoratorKey, true);
