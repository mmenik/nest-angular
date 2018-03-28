import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { LogModule } from '../log/log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Contact]),
        LogModule
    ],
    controllers: [ContactController],
    components: [ContactService]
})
export class ContactModule { }
