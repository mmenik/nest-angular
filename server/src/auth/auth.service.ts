import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { LoginDto } from '../../../shared/src/dto/login.dto';
import { UserService } from '../user/user.service';
import { PasswordCryptService } from './password/password-crypt.service';
import { User } from '../user/user.entity';

@Component()
// tslint:disable-next-line:component-class-suffix
export class AuthService {
    constructor(private readonly userService: UserService,
        private passwordCryptService: PasswordCryptService,
        private readonly log: LogService) { }

    async createToken(username: string) {
        this.log.info(`Create token for user: ${username}`);
        const secretOrPrivateKey: jwt.Secret = process.env.JWT_SECRET;
        const options: jwt.SignOptions = {
            expiresIn: '10m',
            algorithm: 'HS256'
        };
        const token = jwt.sign({ username }, secretOrPrivateKey, options);
        return {
            expiresIn: options.expiresIn,
            token: token,
        };
    }

    async authenticateUser(username: string, password: string): Promise<boolean> {
        this.log.info(`Authenticate user: ${JSON.stringify(username)}`);
        if (username && password) {
            const user: User = await this.userService.findByUsername(username);
            this.log.debug(`User:${JSON.stringify(user)}`);
            if (user) {
                this.log.debug(`password:${password}, hash:${user.password}`);
                return await this.passwordCryptService.doCompare(password, user.password);
            }
        }
        return false;
    }

    async validateUser(username: string): Promise<boolean> {
        this.log.info(`Validate user: ${JSON.stringify(username)}`);
        if (username) {
            const user: User = await this.userService.findByUsername(username);
            return Boolean(user);
        }
        return false;
    }
}
