import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('financial-ledger')
  .setDescription(
    'A simple backend service for staking functionality, built with NestJS and PostgreSQL.',
  )
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

export const swaggerOptions = {
  swaggerOptions: { defaultModelsExpandDepth: -1 },
};
