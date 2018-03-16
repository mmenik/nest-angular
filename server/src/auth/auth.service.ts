import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';

@Component()
// tslint:disable-next-line:component-class-suffix
export class AuthService {
    async createToken() {
        console.log('createtoken');
        const expiresIn = 60 * 60, secretOrKey = 'secret';
        const user = { email: 'thisis@example.com' };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expiresIn: expiresIn,
            token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {
        console.log('validate user');
        return true;
    }
}
