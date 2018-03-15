import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as expressJWT from 'express-jwt';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware {
        return (req, res, next) => {
            console.log('Middleware');
            next();
        };
    }
}
