import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
export class ContactDto {
    @ApiModelProperty()
    @IsString()
    readonly name: string;

    @ApiModelProperty()
    @IsString()
    readonly address: string;

    @ApiModelProperty()
    @IsString()
    readonly photoUrl: string;

    @ApiModelProperty()
    @IsString()
    readonly phone: string;

    @ApiModelProperty()
    @IsEmail()
    readonly email: string;
}
