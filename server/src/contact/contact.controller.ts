import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContactDto } from '../../../shared/src/dto/contact.dto';
import { apiPath } from '../api.path';

@ApiBearerAuth()
@ApiUseTags('Contacts')
@Controller(apiPath(1, 'contacts'))
export class ContactController {

    constructor(private readonly contactService: ContactService) { }

    @ApiOperation({ title: 'Get all contacts' })
    @Get()
    async findAll(): Promise<ContactDto[]> {
        console.log('find all contacts');
        return this.contactService.findAll();
    }

    @ApiOperation({ title: 'Create contact' })
    @Post()
    async create(@Body() contact: ContactDto): Promise<ContactDto> {
        return this.contactService.create(contact);
    }
}
