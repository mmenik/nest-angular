import { Component } from '@nestjs/common';
import { Contact } from './contact.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ContactSchema } from './contact.schema';
import { Model } from 'mongoose';

@Component()
// tslint:disable-next-line:component-class-suffix
export class ContactService {

    constructor(@InjectModel(ContactSchema) private readonly contactModel: Model<Contact>) { }

    async findAll(): Promise<Contact[]> {
        console.log('service find all');
        return await this.contactModel.find().exec();
    }

    async create(contact: Contact): Promise<Contact> {
        console.log('service create');
        const newContact = new this.contactModel(contact);
        return await newContact.save();
    }
}
