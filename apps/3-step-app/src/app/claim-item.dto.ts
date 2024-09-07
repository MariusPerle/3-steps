import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class ClaimItemDto {
    @ApiProperty({ example: 'tafel' })
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString({ each: true })
    itemIds: string[];
}
