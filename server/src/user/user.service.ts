import { Component } from '@nestjs/common';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { LogService } from '../log/log.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Component()
// tslint:disable-next-line:component-class-suffix
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly log: LogService) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByUsername(username: string): Promise<User> {
        this.log.info(`Find user by username: ${username}`);
        return await this.userRepository.findOne({ username: username });
    }

    async create(account: AccountDto): Promise<User> {
        this.log.info(`Create accout ${JSON.stringify(account)}`);

        let entity: User = new User(account);

        entity = await this.userRepository.create(entity);

        this.log.info(`User created: ${JSON.stringify(entity)}`);

        return entity;
    }
}
