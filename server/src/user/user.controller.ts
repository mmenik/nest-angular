import { Controller, Body, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { apiPath } from '../api.path';
import { User } from './user.entity';
import { LogService } from '../log/log.service';

@ApiUseTags('Users')
@Controller(apiPath(1, 'users'))
export class UserController {

    constructor(private readonly userService: UserService, private readonly log: LogService) { }

    @ApiOperation({ title: 'Get all users' })
    @Get()
    async findAll(): Promise<User[]> {
        this.log.info('find all contacts');
        return await this.userService.findAll();
    }

    @ApiOperation({ title: 'Register new account' })
    @ApiResponse({ status: 200, description: 'Credentials are ok, returning new user data.', type: User })
    @ApiResponse({ status: 400, description: 'Email or password are not valid!' })
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() account: AccountDto): Promise<User> {
        return await this.userService.create(account);
    }
}
