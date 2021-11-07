import { Controller, Post, Req } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  async createUser(@Req() req) {
    return await this.userService.create(req.body);
  }
}
