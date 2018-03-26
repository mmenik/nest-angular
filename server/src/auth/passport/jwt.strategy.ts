import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
// tslint:disable-next-line:component-class-suffix
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: process.env.JWT_SECRET,
        }, async (req, payload, next) => await this.verify(req, payload, next));
        passport.use(this);
    }

    public async verify(req, payload, done) {
        console.log(`verify payload: ${JSON.stringify(payload)}`);
        const isValid = await this.authService.validateUser(payload);
        if (!isValid) {
            return done('Unauthorized', false);
        }
        done(null, payload);
    }
}
