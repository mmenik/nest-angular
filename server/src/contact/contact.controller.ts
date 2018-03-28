import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ContactDto } from '../../../shared/src/dto/contact.dto';
import { apiPath } from '../api.path';
import { LogService } from '../log/log.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { LogInterceptor } from '../common/interceptors/log.interceptor';

@ApiBearerAuth()
@ApiUseTags('Contacts')
@UseInterceptors(LogInterceptor)
@Controller(apiPath(1, 'contacts'))
export class ContactController {

    constructor(private readonly contactService: ContactService, private readonly log: LogService) { }

    @ApiOperation({ title: 'Get all contacts' })
    @Get()
    async findAll(): Promise<ContactDto[]> {
        this.log.info('find all contacts');
        return this.contactService.findAll();
    }

    @ApiOperation({ title: 'Create contact' })
    @Post()
    async create(@Body(new ValidationPipe()) contact: ContactDto): Promise<ContactDto> {
        return this.contactService.create(contact);
    }
}
