import { Controller, Post, HttpCode, HttpStatus, Get, Res, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('authenticate')
    @HttpCode(HttpStatus.OK)
    public async token(@Body() body: any, @Res() res) {
        console.log(body);
        return res.json(await this.authService.createToken());
    }
}
