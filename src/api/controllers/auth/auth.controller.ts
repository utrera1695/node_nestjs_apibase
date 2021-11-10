import { Controller, Post, Get, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../guards/local.guard';
import JwtRefreshGuard from '../../guards/jwt-refresh.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from '../../dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() req) {
    return this.authService.login(req.user);
  }
}
