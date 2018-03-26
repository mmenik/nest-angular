import * as path from 'path';

import { ExceptionFilter, NotFoundException, Catch } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    async catch(exception: NotFoundException, res) {
        // return await res.sendFile(path.join(__dirname, '../../public/index.html'));
        return await res.render('index');
    }
}
