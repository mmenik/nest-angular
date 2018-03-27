import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactSchema } from './contact.schema';
import { LogModule } from '../log/log.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
        LogModule
    ],
    controllers: [ContactController],
    components: [ContactService]
})
export class ContactModule { }
