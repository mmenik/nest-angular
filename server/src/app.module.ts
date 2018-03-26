import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ContactController } from './contact/contact.controller';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.module';

import * as dotenv from 'dotenv';
import { LogModule } from './log/log.module';
import { UserController } from './user/user.controller';

dotenv.config();

@Module({
  imports: [
    LogModule,
    ContactModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ]
})
export class ApplicationModule implements NestModule {

  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes(AuthController, ContactController, UserController);
  }

}
