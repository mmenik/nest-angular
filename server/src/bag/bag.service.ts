import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bag } from './bag.entity';
import { Repository } from 'typeorm';
import { BagDto } from '../../../shared/src/dto/bag.dto';
import { LogService } from '../log/log.service';

@Component()
// tslint:disable-next-line:component-class-suffix
export class BagService {

    constructor(@InjectRepository(Bag) private readonly bagRepository: Repository<Bag>,
        private readonly log: LogService) { }

    async findAll(): Promise<Bag[]> {
        return await this.bagRepository.find();
    }

    async create(bag: BagDto): Promise<Bag> {
        this.log.debug(`Create bag:${JSON.stringify(bag)}`);

        const result: Bag = await this.bagRepository.save(Bag.fromDto(bag));

        this.log.debug(`Persisted bag:${JSON.stringify(result)}`);

        return result;
    }
}
