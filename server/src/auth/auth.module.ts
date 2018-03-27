import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { ContactController } from '../contact/contact.controller';
import { UserModule } from '../user/user.module';
import { LogModule } from '../log/log.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
    imports: [UserModule, LogModule],
    components: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware)
            .forRoutes(ContactController);
    }
    // public configure(consumer: MiddlewaresConsumer) {
    //     consumer.apply(passport.authenticate('jwt', { session: false }))
    //         .forRoutes(ContactController);
    // }
    // public configure(consumer: MiddlewaresConsumer) {
    //     consumer.apply(passport.authenticate('jwt', { session: false }, (err, user, info) => {
    //         console.log('err:', err);
    //         console.log('user:', user);
    //         console.log('info', info);

    //         if (!user) {
    //             throw new UnauthorizedException();
    //         }
    //     }))
    //         .forRoutes(ContactController);
    // }
}
