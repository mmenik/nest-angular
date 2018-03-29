import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { BagDto } from '../../../shared/src/dto/bag.dto';

@Entity()
export class Bag {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    code: string;

    static fromDto(dto: BagDto): Bag {
        const entity: Bag = new Bag();
        entity.code = dto.code;
        return entity;
    }
}
