import { ApiModelProperty } from '@nestjs/swagger';

export class BagDto {
    @ApiModelProperty()
    readonly code: string;
}
