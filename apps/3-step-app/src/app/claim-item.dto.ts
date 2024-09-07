import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClaimItemDto {
  @ApiProperty({example: 'tafel'})
  @IsString()
  userId: string;

  @ApiProperty({example: '1'})
  @IsString()
  itemId: string;
}
