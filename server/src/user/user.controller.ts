import { Controller, Body, Post, HttpCode, HttpStatus, Get, UseInterceptors } from '@nestjs/common';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { apiPath } from '../api.path';
import { LogService } from '../log/log.service';
import { LogInterceptor } from '../common/interceptors/log.interceptor';
import { UserDto } from '../../../shared/src/dto/user.dto';
import { User } from './user.entity';

@ApiBearerAuth()
@ApiUseTags('Users')
@UseInterceptors(LogInterceptor)
@Controller(apiPath(1, 'users'))
export class UserController {

    constructor(private readonly userService: UserService, private readonly log: LogService) { }

    @ApiOperation({ title: 'Get all users' })
    @Get()
    async findAll(): Promise<User[]> {
        this.log.info('find all users');
        return await this.userService.findAll();
    }

    @ApiOperation({ title: 'Create user' })
    @ApiResponse({ status: 200, description: 'Credentials are ok, returning new user data.', type: UserDto })
    @ApiResponse({ status: 400, description: 'Email or password are not valid!' })
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() account: AccountDto): Promise<User> {
        return await this.userService.create(account);
    }
}
