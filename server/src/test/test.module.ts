import { Module } from '@nestjs/common';
import { TestController } from './test.controller';

@Module({
    components: [],
    controllers: [TestController]
})
export class TestModule { }
