import { ExceptionFilter, Catch, UnauthorizedException } from '@nestjs/common';
import { LogService } from '../log/log.service';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: UnauthorizedException, res) {
        this.log.warn(`UnauthorizedException: ${exception.message}`);
        res.status(401).json({
            statusCode: 401,
            message: exception.message
        });
    }
}
