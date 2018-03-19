import { Controller, Post, HttpCode, HttpStatus, Get, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('authenticate')
    // @HttpCode(HttpStatus.OK)
    public async login(@Res() res, @Body() body: User) {        
        if (await this.authService.validateUser(body)) {
            return res.status(HttpStatus.OK).json(await this.authService.createToken(body.username));
        }
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong' });
    }
}
