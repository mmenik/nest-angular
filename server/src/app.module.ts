import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './home/home.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ContactController } from './contact/contact.controller';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user/user.model';

@Module({
  imports: [
    ContactModule,
    AuthModule,
    UserModule,
    HomeModule,
    MongooseModule.forRoot('mongodb://localhost:27017/contactmanager')
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware)
      .with('ApplicationModule')
      .forRoutes(AuthController, ContactController);
  }
}
