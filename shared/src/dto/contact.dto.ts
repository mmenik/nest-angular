import { ApiModelProperty } from '@nestjs/swagger';

export class ContactDto {
    @ApiModelProperty()
    readonly name: string;
    @ApiModelProperty()
    readonly address: string;
    @ApiModelProperty()
    readonly photoUrl: string;
    @ApiModelProperty()
    readonly phone: string;
}
