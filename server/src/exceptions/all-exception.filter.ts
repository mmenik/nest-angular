import { ExceptionFilter, Catch, } from '@nestjs/common';
import { LogService } from '../log/log.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: any, res) {
        this.log.error(`${exception}`);
        res.status(500).json({
            statusCode: 500,
            message: `${exception}`
        });
    }
}
