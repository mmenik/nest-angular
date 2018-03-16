import { Controller, Get, Post, Body } from '@nestjs/common';
import { Contact } from './contact.interface';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Get()
    async findAll(): Promise<Contact[]> {
        console.log('find all contact');
        return this.contactService.findAll();
    }

    @Post()
    async create(@Body() contact: Contact): Promise<Contact> {
        console.log('create a new contact');
        return this.contactService.create(contact);
    }
}
