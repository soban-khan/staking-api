import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './configs/typerom.config';

@Module({
  imports: [TypeOrmModule.forRoot(TYPEORM_CONFIG)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
