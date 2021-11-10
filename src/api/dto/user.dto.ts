import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  lastName?: string;
}

export class UserLoginDto {
  @ApiProperty({ default: 'utrera1695@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1234abcd' })
  password: string;
}
