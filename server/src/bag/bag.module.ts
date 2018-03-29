import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bag } from './bag.entity';
import { BagController } from './bag.controller';
import { BagService } from './bag.service';
import { LogModule } from '../log/log.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bag]),
        LogModule
    ],
    controllers: [BagController],
    components: [BagService]
})
export class BagModule { }
