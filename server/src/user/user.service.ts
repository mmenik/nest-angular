import { Component } from '@nestjs/common';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { LogService } from '../log/log.service';

@Component()
// tslint:disable-next-line:component-class-suffix
export class UserService {

    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>,
        private readonly log: LogService) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findByUsername(username: string): Promise<User> {
        this.log.info(`Find user by username: ${username}`);
        return await this.userModel.findOne({ username: username });
    }

    async create(account: AccountDto): Promise<User> {
        this.log.info(`Create accout ${JSON.stringify(account)}`);

        const user: User = await this.userModel.create({
            firstname: account.user.firstname,
            lastname: account.user.lastname,
            password: account.login.password,
            username: account.login.username,
        });

        this.log.info(`User created: ${user}`);

        return user;
    }
}
