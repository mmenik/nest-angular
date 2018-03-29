import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { apiPath } from '../api.path';
import { BagService } from './bag.service';
import { Bag } from './bag.entity';
import { BagDto } from '../../../shared/src/dto/bag.dto';

@ApiBearerAuth()
@ApiUseTags('Bags')
@Controller(apiPath(1, 'bags'))
export class BagController {

    constructor(private readonly bagService: BagService) { }

    @ApiOperation({ title: 'Get all bags' })
    @Get()
    async findAll(): Promise<Bag[]> {
        return await this.bagService.findAll();
    }

    @ApiOperation({ title: 'Create bag' })
    @ApiResponse({ status: 200, description: 'Persist new bag.', type: BagDto })
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() bag: BagDto): Promise<Bag> {
        return await this.bagService.create(bag);
    }
}
