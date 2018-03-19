import { Controller, All, Res, Req } from '@nestjs/common';
import * as path from 'path';

@Controller()
export class HomeController {
    constructor() { }

    @All('*')
    async home(@Res() res) {
        return await res.sendFile(path.join(__dirname, '../../../public/index.html'));
    }
}
