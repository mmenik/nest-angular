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

    async createToken(username: string) {
        this.log.info(`Create token for user: ${username}`);
        const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET;
        const options: jwt.SignOptions = {
            expiresIn: '1m',
            algorithm: 'HS256'
        };
        const token = jwt.sign({ username }, secretOrPrivateKey, options);
        return {
            expiresIn: options.expiresIn,
            token: token,
        };
    }

    async validateUser(username: string): Promise<boolean> {
        this.log.info(`Signed user: ${JSON.stringify(username)}`);
        if (username) {
            const valid: boolean = Boolean(await this.userService.findByUsername(username));
            this.log.info(`Valid user: ${valid}`);
            return valid;
        }

        return false;
    }
}
