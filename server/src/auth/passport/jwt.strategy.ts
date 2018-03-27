import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LogService } from '../../log/log.service';

@Component()
// tslint:disable-next-line:component-class-suffix
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService, private readonly log: LogService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: process.env.JWT_SECRET,
        }, async (req, payload, next) => await this.verify(req, payload, next));
        passport.use(this);
    }

    public async verify(req, payload, done) {
        this.log.info(`verify payload: ${JSON.stringify(payload)}`);
        const isValid = await this.authService.validateUser(payload.username);
        if (isValid) {
            return done('invalid', false);
        }
        done(null, payload);
    }
}
