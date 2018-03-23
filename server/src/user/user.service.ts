import { Component } from '@nestjs/common';
import { IUser } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { LogService } from '../log/log.service';

@Component()
// tslint:disable-next-line:component-class-suffix
export class UserService {

    constructor(@InjectModel(UserSchema) private readonly userModel: Model<IUser>,
        private readonly log: LogService) { }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findByUsername(username: string): Promise<IUser> {
        this.log.info(`Find user by username: ${username}`);
        return await this.userModel.findOne({ username: username });
    }

    async create(account: AccountDto): Promise<IUser> {
        this.log.info(`Create accout ${account}`);
        const user: IUser = await this.userModel.create(account);
        this.log.info(`User created: ${user}`);
        return user;
    }
}
