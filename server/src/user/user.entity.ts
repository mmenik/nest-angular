import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { AccountDto } from '../../../shared/src/dto/account.dto';

@Entity()
export class User {
    constructor(private readonly account?: AccountDto) {
        if (account) {
            this.username = account.login.username;
            this.password = account.login.password;
            this.firstname = account.user.firstname;
            this.lastname = account.user.lastname;
            this.admin = false;
        }
    }

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    admin: boolean;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;
}
