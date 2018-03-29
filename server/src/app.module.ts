import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { LogMiddleware } from './common/middlewares/log.middleware';
import { BagModule } from './bag/bag.module';

import { BagController } from './bag/bag.controller';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    LogModule,
    AuthModule,
    UserModule,
    BagModule
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LogMiddleware)
      .with('Request api')
      .forRoutes(AuthController, UserController, BagController);
  }
}
