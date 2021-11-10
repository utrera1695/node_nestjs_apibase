import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { CreateUserDto } from '../../dto/user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { IdDto } from '../../dto/general.dto';
import { User } from '../../entities/user/user.entity';
import { JwtAuthGuard } from '../../guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUserById(@Param() params: IdDto): Promise<User | NotFoundException> {
    const user = await this.userService.findOneById(params.id);
    console.log(user);
    return user;
  }
}
