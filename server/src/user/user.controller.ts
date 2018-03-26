import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { apiPath } from '../api.path';

@ApiUseTags('Users')
@Controller(apiPath(1, 'users'))
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ title: 'Register new account' })
    @ApiResponse({ status: 200, description: 'Credentials are ok, returning new user data.', type: UserSchema })
    @ApiResponse({ status: 400, description: 'Email or password are not valid!' })
    @HttpCode(HttpStatus.OK)
    @Post()
    public async create(@Body() account: AccountDto) {
        return await this.userService.create(account);
    }
}
