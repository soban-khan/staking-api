import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from 'src/constants/env.constants';

export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: ENV.PSQL.HOST,
  port: ENV.PSQL.PORT,
  username: ENV.PSQL.USERNAME,
  password: ENV.PSQL.PASSWORD,
  database: ENV.PSQL.DATABASE,
  synchronize: ENV.PSQL.SYNCHRONIZE,
  autoLoadEntities: true,
};
