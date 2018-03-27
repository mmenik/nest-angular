import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { LogService } from './log.service';
import { Request, Response, NextFunction } from 'express';

@Middleware()
export class LogMiddleware implements NestMiddleware {

    constructor(private readonly log: LogService) { }

    resolve(param: string): ExpressMiddleware {
        return (req: Request, res: Response, next: NextFunction) => {
            this.log.debug(`${param} Url: ${req.url}, Method: ${req.method}`);
            next();
        };
    }
}
