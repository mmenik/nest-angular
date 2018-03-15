import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { HomeModule } from './home/home.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TestController } from './test/test.controller';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

@Module({
  modules: [TestModule, HomeModule]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoggerMiddleware)
    .with('ApplicationModule')
      .forRoutes(TestController);
  }
}
