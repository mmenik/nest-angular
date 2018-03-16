import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { ContactController } from '../contact/contact.controller';

@Module({
    components: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(ContactController);
    }
}