import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactSchema } from './contact.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }])],
    controllers: [ContactController],
    components: [ContactService]
})
export class ContactModule { }
