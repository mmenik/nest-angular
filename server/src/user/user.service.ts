import { Component } from '@nestjs/common';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { UserModule } from './user.model';

@Component()
// tslint:disable-next-line:component-class-suffix
export class UserService {

    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) { }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async find(user: User): Promise<User> {
        return await this.userModel.findOne({ username: user.username });
    }
}
