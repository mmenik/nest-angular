import { Controller, Post, HttpCode, HttpStatus, Get, Res, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../../../shared/src/dto/login.dto';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ title: 'Authorize' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Credential are ok, return JWT.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The email or password is incorrect!.' })
    @Post()
    // @HttpCode(HttpStatus.OK)
    public async login(@Body() body: LoginDto) {
        console.log('login');
        if (await this.authService.validateUser(body)) {
            // return res.status(HttpStatus.OK).json(await this.authService.createToken(body.username));
            return await this.authService.createToken(body.username);
        }
        throw new BadRequestException('Incorrect email or password');
        // return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Username or password wrong' });
    }
}
