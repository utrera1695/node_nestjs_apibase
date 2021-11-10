import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdDto {
  @IsInt()
  @ApiProperty({ required: true })
  id: number;
}
