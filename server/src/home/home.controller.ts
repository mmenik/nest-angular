import { Controller, All, Res } from '@nestjs/common';
import * as path from 'path';

@Controller()
export class HomeController {
    constructor() { }

    @All('*')
    async home(@Res() res) {
        console.log('home');
        return await res.sendFile(path.join(__dirname, '../../../public/index.html'));
    }
}
