import { Controller, Get, Req, HttpStatus, Res } from '@nestjs/common';

@Controller('test')
export class TestController {
    constructor() { }

    @Get()
    title(@Req() req, @Res() res): string {
        console.log('get request');
        return res.status(HttpStatus.OK).json({
            title: 'titolo2'
        });
    }
}
