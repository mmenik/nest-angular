import { Get, Req, Res, Controller, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
    @Get()
    root(@Req() req, @Res() res): string {
        console.log('get request');
        return res.status(HttpStatus.OK).json({
            title: 'titolo2'
        });
    }
}
