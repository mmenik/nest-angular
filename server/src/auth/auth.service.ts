import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import { LogService } from '../log/log.service';
import { LoginDto } from '../../../shared/src/dto/login.dto';

@Component()
// tslint:disable-next-line:component-class-suffix
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly log: LogService) { }

    async createToken(user: string) {
        this.log.info(`Create token for user: ${user}`);
        const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET;
        const options: jwt.SignOptions = {
            expiresIn: '10m',
            algorithm: 'HS256'
        };
        const token = jwt.sign({ payload: user }, secretOrPrivateKey, options);
        return {
            expiresIn: options.expiresIn,
            token: token,
        };
    }

    async validateUser(signedUser: LoginDto): Promise<boolean> {
        console.log(signedUser);
        this.log.info(`Validate user: ${JSON.stringify(signedUser)}`);
        if (signedUser && signedUser.username) {
            const valid: boolean = Boolean(await this.userService.findByUsername(signedUser.username));
            this.log.info(`Valid user: ${valid}`);
            return valid;
        }

        return false;
    }
}
