import { IUser } from '../interfaces/user.interface';
import { LoginDto } from './login.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class AccountDto {
    @ApiModelProperty()
    readonly user: IUser;
    @ApiModelProperty()
    readonly login: LoginDto;
}
