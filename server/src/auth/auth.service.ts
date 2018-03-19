import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';

@Component()
// tslint:disable-next-line:component-class-suffix
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async createToken(user: string) {
        const expiresIn = 60 * 60;
        const secretOrKey = 'secret';
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expiresIn: expiresIn,
            token: token,
        };
    }

    async validateUser(signedUser: User): Promise<boolean> {
        if (signedUser && signedUser.username) {
            const valid: boolean = Boolean(await this.userService.find(signedUser));
            console.log(`Valid user: ${valid}`);
            return valid;
        }

        return false;
    }
}
