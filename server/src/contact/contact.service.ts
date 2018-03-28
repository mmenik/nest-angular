import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactDto } from '../../../shared/src/dto/contact.dto';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';

@Component()
// tslint:disable-next-line:component-class-suffix
export class ContactService {

    constructor(@InjectRepository(Contact) private readonly contactRepository: Repository<Contact>) { }

    async findAll(): Promise<ContactDto[]> {
        return await this.contactRepository.find();
    }

    async create(contact: ContactDto): Promise<ContactDto> {
        const entity = new Contact(contact);

        return await this.contactRepository.save(entity);
    }
}
