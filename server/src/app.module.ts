import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { UserController } from './user/user.controller';
import { ContactModule } from './contact/contact.module';
import { LogMiddleware } from './common/middlewares/log.middleware';
import { ContactController } from './contact/contact.controller';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    LogModule,
    ContactModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot()
  ]
})
export class ApplicationModule implements NestModule {

  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LogMiddleware)
      .with('Request api')
      .forRoutes(AuthController, ContactController, UserController);
  }

}
