import { Component } from '@nestjs/common';
import { Contact } from './contact.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ContactSchema } from './contact.schema';
import { Model } from 'mongoose';
import { ContactDto } from '../../../shared/src/dto/contact.dto';

@Component()
// tslint:disable-next-line:component-class-suffix
export class ContactService {

    constructor(@InjectModel(ContactSchema) private readonly contactModel: Model<Contact>) { }

    async findAll(): Promise<ContactDto[]> {
        return await this.contactModel.find().exec();
    }

    async create(contact: ContactDto): Promise<Contact> {
        const newContact = new this.contactModel(contact);
        return await newContact.save();
    }
}
