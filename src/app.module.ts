import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './configs/typerom.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(TYPEORM_CONFIG), UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
