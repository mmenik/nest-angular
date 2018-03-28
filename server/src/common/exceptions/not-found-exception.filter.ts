import * as path from 'path';

import { ExceptionFilter, NotFoundException, Catch } from '@nestjs/common';
import { LogService } from '../../log/log.service';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: NotFoundException, res) {
        // return await res.sendFile(path.join(__dirname, '../../public/index.html'));
        this.log.info(`Render to index`);
        return await res.render('index');
    }
}
