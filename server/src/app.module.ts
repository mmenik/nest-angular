import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import { HomeModule } from './home/home.module';

@Module({
  modules: [TestModule, HomeModule],
  controllers: []
})
export class ApplicationModule { }
