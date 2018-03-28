import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { ContactDto } from '../../../shared/src/dto/contact.dto';

@Entity()
export class Contact {
    constructor(private readonly contact?: ContactDto) {
        if (contact) {
            this.name = contact.name;
            this.address = contact.address;
            this.photoUrl = contact.photoUrl;
            this.phone = contact.phone;
            this.email = contact.email;
        }
    }

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    photoUrl: string;

    @Column()
    phone: string;

    @Column()
    email: string;
}
