import { HttpException, HttpStatus } from '@nestjs/common';
import { config } from 'dotenv';
config({ path: '.env' });

function getEnvVariable(name: string) {
  const envVar = process.env[name];
  if (!envVar) {
    throw new HttpException(
      `No Such Env:${name} variable`,
      HttpStatus.FAILED_DEPENDENCY,
    );
  }
  return envVar;
}

export const ENV = {
  PORT: process.env['PORT'] ?? 3000,
  PSQL: {
    HOST: getEnvVariable('PSQL_HOST'),
    PORT: parseInt(getEnvVariable('PSQL_PORT')),
    USERNAME: getEnvVariable('PSQL_USERNAME'),
    PASSWORD: getEnvVariable('PSQL_PASSWORD'),
    DATABASE: getEnvVariable('PSQL_DATABASE'),
    SYNCHRONIZE: getEnvVariable('PSQL_SYNCHRONIZE') === 'true' ? true : false,
  },
  JWT: {
    EXPIRY: getEnvVariable('JWT_EXPIRY'),
    SECRET: getEnvVariable('JWT_AUTHSECRET'),
  },
};
