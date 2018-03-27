import { Middleware, NestMiddleware, ExpressMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as passport from 'passport';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    resolve(param: string): ExpressMiddleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
                console.log('err:', err);
                console.log('user:', user);
                console.log('info', info);
                if (err === 'invalid') {
                    next(new UnauthorizedException('Invalid user'));
                }

                if (!user) {
                    next(new UnauthorizedException('Unauthorized'));
                }

                next();
            })(req, res, next);
        };
    }
}
