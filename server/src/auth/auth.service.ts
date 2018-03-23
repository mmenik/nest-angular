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
        this.log.info(`Create token`);
        const expiresIn = 60 * 60;
        const secretOrKey = 'secret';
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expiresIn: expiresIn,
            token: token,
        };
    }

    async validateUser(signedUser: LoginDto): Promise<boolean> {
        this.log.info(`Validate user: ${signedUser}`);
        if (signedUser && signedUser.username) {
            const valid: boolean = Boolean(await this.userService.findByUsername(signedUser.username));
            this.log.info(`Valid user: ${valid}`);
            return valid;
        }

        return false;
    }
}
